// Replace with your actual API key
const ALPHA_VANTAGE_API_KEY = "9MCMXH6G3RU2QQ9S";

const API = {
    state: {
        netWorth: 422420.55,
        accounts: [
            { id: 'brokerage', name: 'Brokerage', num: '****1234', cash: 10420.55, value: 312000.00 },
            { id: 'ira', name: 'Roth IRA', num: '****5678', cash: 0.00, value: 250000.00 },
            { id: 'checking', name: 'Schwab Bank Checking', num: '****9012', cash: 60000.00, value: 60000.00 }
        ],
        positions: [
            { sym: 'AAPL', desc: 'Apple Inc', shares: 100, price: 172.50, prevClose: 170.00, costBasis: 150.00 },
            { sym: 'MSFT', desc: 'Microsoft Corp', shares: 50, price: 420.00, prevClose: 415.00, costBasis: 380.00 },
            { sym: 'SCHW', desc: 'Charles Schwab', shares: 200, price: 72.00, prevClose: 71.50, costBasis: 60.00 },
            { sym: 'VOO', desc: 'Vanguard S&P 500', shares: 30, price: 475.00, prevClose: 470.00, costBasis: 400.00 }
        ],
        watchlists: [
            { name: 'My Watchlist', items: ['TSLA', 'NVDA', 'AMZN'] }
        ]
    },

    isMarketOpen: () => {
        const now = new Date();
        const etTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
        const day = etTime.getDay();
        const hours = etTime.getHours();
        const minutes = etTime.getMinutes();
        const time = hours + minutes / 60;
        return day >= 1 && day <= 5 && time >= 9.5 && time < 16;
    },

    fetchQuotes: async () => {
        if (!API.isMarketOpen()) {
            console.log("Market closed. Using static data.");
            return;
        }

        console.log("Market open. Fetching quotes...");
        const symbols = ['AAPL', 'MSFT', 'SCHW', 'VOO', 'TSLA', 'NVDA', 'AMZN'];
        
        for (const sym of symbols) {
            try {
                // Note: Alpha Vantage rate limits to 25 req/day.
                // We'll just do one mock fetch here to save API calls in a real environment
                // and update the price state slightly to simulate streaming.
                const mockPrice = API.state.positions.find(p => p.sym === sym)?.price || 100 + Math.random() * 400;
                API.updatePositionPrice(sym, mockPrice + (Math.random() - 0.5) * 2);
            } catch (e) {
                console.error("API Error:", e);
            }
        }
    },

    updatePositionPrice: (sym, newPrice) => {
        const pos = API.state.positions.find(p => p.sym === sym);
        if (pos) {
            pos.prevClose = pos.price;
            pos.price = newPrice;
        }
    },

    startStreaming: () => {
        // Simulate WebSocket streaming for UI smoothness every 5 seconds
        setInterval(() => {
            API.state.positions.forEach(p => {
                p.price += (Math.random() - 0.5) * 0.50;
                p.price = parseFloat(p.price.toFixed(2));
            });
            // Update UI if on positions screen
            if (UI.currentRoute === 'positions') UI.renderPositions();
            if (UI.currentRoute === 'markets') UI.renderMarkets();
        }, 5000);
    },

    init: () => {
        API.fetchQuotes();
        setInterval(API.fetchQuotes, 30 * 60 * 1000); // 30 minutes
        API.startStreaming();
    }
};
