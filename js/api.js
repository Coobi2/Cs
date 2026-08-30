// Replace with your actual API key
const ALPHA_VANTAGE_API_KEY = "YOUR_API_KEY_HERE";

const API = {
    state: {
        // Total: 422,420.55
        netWorth: 422420.55,
        accounts: [
            // Brokerage: 312,000 (Cash 10,420.55 + Holdings 301,579.45)
            { id: 'brokerage', name: 'Brokerage', num: '****1234', cash: 10420.55, value: 312000.00 },
            // IRA: 50,000.00 (All cash for simplicity in this view)
            { id: 'ira', name: 'Roth IRA', num: '****5678', cash: 0.00, value: 250000.00 },
            // Checking: 60,000.00
            { id: 'checking', name: 'Schwab Bank Checking', num: '****9012', cash: 60000.00, value: 60000.00 }
        ],
        positions: [
            // Brokerage Holdings Value Target: ~301,579.45
            { sym: 'HCA', desc: 'HCA Healthcare', shares: 100, price: 317.50, prevClose: 315.00, costBasis: 280.00 },
            { sym: 'GE', desc: 'General Electric', shares: 150, price: 175.20, prevClose: 173.50, costBasis: 120.00 },
            { sym: 'NET', desc: 'Cloudflare', shares: 200, price: 92.40, prevClose: 91.10, costBasis: 65.00 },
            { sym: 'HWM', desc: 'Howmet Aerospace', shares: 300, price: 102.10, prevClose: 101.50, costBasis: 80.00 },
            { sym: 'FTAI', desc: 'FTAI Aviation', shares: 250, price: 62.80, prevClose: 61.20, costBasis: 45.00 },
            { sym: 'WAB', desc: 'Westinghouse Air Brake', shares: 120, price: 120.50, prevClose: 119.00, costBasis: 95.00 },
            { sym: 'CRWD', desc: 'CrowdStrike', shares: 80, price: 345.20, prevClose: 342.00, costBasis: 250.00 }
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
        const symbols = API.state.positions.map(p => p.sym);
        
        for (const sym of symbols) {
            try {
                // Mock price update logic for UI smoothness
                const pos = API.state.positions.find(p => p.sym === sym);
                if (pos) {
                    pos.prevClose = pos.price;
                    pos.price = parseFloat((pos.price + (Math.random() - 0.5) * 2).toFixed(2));
                }
            } catch (e) {
                console.error("API Error:", e);
            }
        }
    },

    startStreaming: () => {
        setInterval(() => {
            API.state.positions.forEach(p => {
                p.price += (Math.random() - 0.5) * 0.50;
                p.price = parseFloat(p.price.toFixed(2));
            });
            if (UI.currentRoute === 'positions') UI.renderPositions();
            if (UI.currentRoute === 'markets') UI.renderMarkets();
        }, 5000);
    },

    init: () => {
        API.fetchQuotes();
        setInterval(API.fetchQuotes, 30 * 60 * 1000);
        API.startStreaming();
    }
};
