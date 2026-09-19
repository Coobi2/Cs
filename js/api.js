const STORAGE_KEY = 'schwab-simulator-state-v2';

const DEFAULT_STATE = {
    version: 2,
    selectedAccountId: 'brokerage',
    accounts: [
        { id: 'brokerage', name: 'Brokerage', num: '****1234', cash: 10420.55 },
        { id: 'ira', name: 'Roth IRA', num: '****5678', cash: 0.00 },
        { id: 'checking', name: 'Schwab Bank Checking', num: '****9012', cash: 60000.00 }
    ],
    positions: [
        { sym: 'HCA', desc: 'HCA Healthcare', shares: 100, price: 317.50, prevClose: 315.00, costBasis: 280.00 },
        { sym: 'GE', desc: 'General Electric', shares: 150, price: 175.20, prevClose: 173.50, costBasis: 120.00 },
        { sym: 'NET', desc: 'Cloudflare', shares: 200, price: 92.40, prevClose: 91.10, costBasis: 65.00 },
        { sym: 'HWM', desc: 'Howmet Aerospace', shares: 300, price: 102.10, prevClose: 101.50, costBasis: 80.00 },
        { sym: 'FTAI', desc: 'FTAI Aviation', shares: 250, price: 62.80, prevClose: 61.20, costBasis: 45.00 },
        { sym: 'WAB', desc: 'Westinghouse Air Brake', shares: 120, price: 120.50, prevClose: 119.00, costBasis: 95.00 },
        { sym: 'CRWD', desc: 'CrowdStrike', shares: 80, price: 345.20, prevClose: 342.00, costBasis: 250.00 }
    ],
    watchlists: [
        {
            name: 'My Watchlist',
            items: ['AAPL', 'TSLA', 'NVDA', 'AMZN']
        }
    ],
    quotes: {
        AAPL: { desc: 'Apple Inc.', price: 232.14, prevClose: 229.88 },
        TSLA: { desc: 'Tesla, Inc.', price: 337.81, prevClose: 332.10 },
        NVDA: { desc: 'NVIDIA Corporation', price: 177.35, prevClose: 175.92 },
        AMZN: { desc: 'Amazon.com, Inc.', price: 232.88, prevClose: 229.72 }
    },
    transactions: [],
    orders: [],
    portfolioHistory: []
};

const API = {
    state: null,
    _streamTimer: null,
    _quoteTimer: null,

    clone: (value) => JSON.parse(JSON.stringify(value)),

    normalizeState: (raw) => {
        const base = API.clone(DEFAULT_STATE);
        if (!raw || typeof raw !== 'object') return base;

        const merged = {
            ...base,
            ...raw,
            accounts: Array.isArray(raw.accounts) && raw.accounts.length ? raw.accounts : base.accounts,
            positions: Array.isArray(raw.positions) ? raw.positions : base.positions,
            watchlists: Array.isArray(raw.watchlists) ? raw.watchlists : base.watchlists,
            quotes: { ...base.quotes, ...(raw.quotes || {}) },
            transactions: Array.isArray(raw.transactions) ? raw.transactions : [],
            orders: Array.isArray(raw.orders) ? raw.orders : [],
            portfolioHistory: Array.isArray(raw.portfolioHistory) ? raw.portfolioHistory : []
        };

        merged.accounts = merged.accounts.map(account => ({
            ...account,
            cash: Number(account.cash) || 0
        }));

        merged.positions = merged.positions
            .map(position => ({
                ...position,
                shares: Number(position.shares) || 0,
                price: Number(position.price) || 0,
                prevClose: Number(position.prevClose) || Number(position.price) || 0,
                costBasis: Number(position.costBasis) || 0
            }))
            .filter(position => position.shares > 0);

        return merged;
    },

    load: () => {
        let saved = null;
        try {
            saved = localStorage.getItem(STORAGE_KEY);
        } catch (error) {
            console.warn('Local storage is unavailable:', error);
        }

        try {
            API.state = API.normalizeState(saved ? JSON.parse(saved) : null);
        } catch (error) {
            console.warn('Saved simulator state could not be read; using defaults.', error);
            API.state = API.normalizeState(null);
        }

        API.seedHistoryIfNeeded();
        API.save();
    },

    save: () => {
        if (!API.state) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(API.state));
        } catch (error) {
            console.warn('Could not persist simulator state:', error);
        }
    },

    reset: () => {
        API.stopStreaming();
        API.state = API.normalizeState(null);
        API.seedHistoryIfNeeded();
        API.save();
        UI.navigate('dashboard');
        UI.toast('Simulator reset to the starting portfolio.');
    },

    getAccount: (accountId = API.state?.selectedAccountId || 'brokerage') => {
        return API.state?.accounts.find(account => account.id === accountId) || null;
    },

    getBrokerageAccount: () => API.getAccount('brokerage'),

    getPosition: (sym) => {
        const symbol = String(sym || '').trim().toUpperCase();
        return API.state?.positions.find(position => position.sym === symbol) || null;
    },

    getQuote: (sym) => {
        const symbol = String(sym || '').trim().toUpperCase();
        const position = API.getPosition(symbol);
        if (position) return position;
        return API.state?.quotes?.[symbol] || null;
    },

    getHoldingsValue: () => {
        return (API.state?.positions || []).reduce((total, position) => {
            return total + position.shares * position.price;
        }, 0);
    },

    getNetWorth: () => {
        return (API.state?.accounts || []).reduce((total, account) => total + account.cash, 0) + API.getHoldingsValue();
    },

    getAccountValue: (accountId = 'brokerage') => {
        const account = API.getAccount(accountId);
        if (!account) return 0;
        const holdings = accountId === 'brokerage' ? API.getHoldingsValue() : 0;
        return account.cash + holdings;
    },

    getDayGain: () => {
        return (API.state?.positions || []).reduce((total, position) => {
            return total + position.shares * (position.price - position.prevClose);
        }, 0);
    },

    getTotalGain: () => {
        return (API.state?.positions || []).reduce((total, position) => {
            return total + position.shares * (position.price - position.costBasis);
        }, 0);
    },

    getCash: (accountId = 'brokerage') => API.getAccount(accountId)?.cash || 0,

    recordPortfolioSnapshot: () => {
        const snapshot = {
            timestamp: Date.now(),
            value: Number(API.getNetWorth().toFixed(2))
        };

        const history = API.state.portfolioHistory;
        const last = history[history.length - 1];
        if (!last || last.value !== snapshot.value || snapshot.timestamp - last.timestamp >= 300000) {
            history.push(snapshot);
        }

        while (history.length > 120) history.shift();
        API.save();
    },

    seedHistoryIfNeeded: () => {
        if (API.state.portfolioHistory?.length) return;
        const now = Date.now();
        const current = API.getNetWorth();
        const points = [
            { minutesAgo: 240, multiplier: 0.9976 },
            { minutesAgo: 210, multiplier: 0.9988 },
            { minutesAgo: 180, multiplier: 0.9979 },
            { minutesAgo: 150, multiplier: 0.9995 },
            { minutesAgo: 120, multiplier: 0.9989 },
            { minutesAgo: 90, multiplier: 1.0003 },
            { minutesAgo: 60, multiplier: 0.9998 },
            { minutesAgo: 45, multiplier: 1.0005 },
            { minutesAgo: 30, multiplier: 1.0001 },
            { minutesAgo: 15, multiplier: 0.9997 },
            { minutesAgo: 5, multiplier: 1.0002 },
            { minutesAgo: 0, multiplier: 1 }
        ];

        API.state.portfolioHistory = points.map(point => ({
            timestamp: now - point.minutesAgo * 60000,
            value: Number((current * point.multiplier).toFixed(2))
        }));
    },

    isMarketOpen: () => {
        const now = new Date();
        const et = new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/New_York',
            weekday: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).formatToParts(now);
        const parts = Object.fromEntries(et.map(part => [part.type, part.value]));
        const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday);
        const hour = Number(parts.hour);
        const minute = Number(parts.minute);
        const decimalTime = hour + minute / 60;
        return day >= 1 && day <= 5 && decimalTime >= 9.5 && decimalTime < 16;
    },

    updatePrices: () => {
        const positions = API.state.positions || [];
        positions.forEach(position => {
            position.prevClose = position.prevClose || position.price;
            const volatility = Math.max(0.08, position.price * 0.0007);
            const drift = (Math.random() - 0.5) * volatility;
            position.price = Number(Math.max(0.01, position.price + drift).toFixed(2));
        });

        Object.values(API.state.quotes || {}).forEach(quote => {
            quote.prevClose = quote.prevClose || quote.price;
            const volatility = Math.max(0.05, quote.price * 0.0008);
            quote.price = Number(Math.max(0.01, quote.price + (Math.random() - 0.5) * volatility).toFixed(2));
        });

        API.recordPortfolioSnapshot();
        API.save();
    },

    startStreaming: () => {
        API.stopStreaming();
        API._streamTimer = window.setInterval(() => {
            API.updatePrices();
            if (typeof UI !== 'undefined') UI.refreshCurrentView();
        }, 5000);
    },

    stopStreaming: () => {
        if (API._streamTimer) {
            clearInterval(API._streamTimer);
            API._streamTimer = null;
        }
        if (API._quoteTimer) {
            clearInterval(API._quoteTimer);
            API._quoteTimer = null;
        }
    },

    init: () => {
        API.load();
        API.updatePrices();
        API.startStreaming();
    }
};
