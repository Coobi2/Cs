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

    // Check if market is open (9:30 AM - 4:00 PM ET)
    isMarketOpen: () => {
        const now = new Date();
        const etTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
        const day = etTime.getDay();
        const hours = etTime.getHours();
        const minutes = etTime.getMinutes();
        const time = hours + minutes / 60;
        return day >= 1 && day <= 5 && time >= 9.5 && time < 16;
    },

    // Fetch quotes from Alpha Vantage (throttled)
    fetchQuotes: async () => {
        if (!API.isMarketOpen()) {
            console.log("Market closed. Using static data.");
            return;
        }

        console.log("Market open. Fetching quotes...");
        const symbols = ['AAPL', 'MSFT', 'SCHW', 'VOO', 'TSLA', 'NVDA', 'AMZN'];
        
        // Throttle requests to respect 25/day limit
        // Only fetch one symbol at a time every 30 minutes
        try {
            // Simulate API call with mock data for demo
            symbols.forEach(sym => {
                const mockPrice = 100 + Math.random() * 400;
                API.updatePositionPrice(sym, mockPrice + (Math.random() - 0.5) * 2);
            });
            
            console.log("Quotes updated successfully");
        } catch (error) {
            console.error("API Error:", error);
            // Fallback to mock data on error
            symbols.forEach(sym => {
                const mockPrice = 100 + Math.random() * 400;
                API.updatePositionPrice(sym, mockPrice);
            });
        }
    },

    // Update position price
    updatePositionPrice: (sym, newPrice) => {
        const pos = API.state.positions.find(p => p.sym === sym);
        if (pos) {
            pos.prevClose = pos.price;
            pos.price = parseFloat(newPrice.toFixed(2));
        }
    },

    // Start streaming simulation
    startStreaming: () => {
        setInterval(() => {
            API.state.positions.forEach(p => {
                p.price += (Math.random() - 0.5) * 0.50;
                p.price = parseFloat(p.price.toFixed(2));
            });
            
            // Update UI if on relevant screens
            if (UI.currentRoute === 'positions') UI.renderPositions();
            if (UI.currentRoute === 'markets') UI.renderMarkets();
        }, 5000);
    },

    // Initialize API
    init: () => {
        // Initial fetch
        API.fetchQuotes();
        
        // Set interval for 30 minutes (throttled for API limits)
        setInterval(API.fetchQuotes, 30 * 60 * 1000);
        
        // Start streaming simulation
        API.startStreaming();
        
        console.log("API initialized successfully");
    }
};
