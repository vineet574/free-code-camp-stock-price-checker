const fetch = require('node-fetch');
const crypto = require('crypto');

let stockLikes = {};  // Store likes by IP for each stock

// Helper function to anonymize IP addresses
function anonymizeIP(ip) {
    return crypto.createHash('sha256').update(ip).digest('hex');
}

// Function to fetch stock data from an external API (Replace with actual API URL)
async function fetchStockPrice(symbol) {
    const response = await fetch(`https://some-stock-api.com/price/${symbol}`);
    const data = await response.json();
    return { symbol, price: parseFloat(data.price) };
}

// Main function to get stock data and handle likes
async function getStockData(stocks, like, ip) {
    const ipHash = anonymizeIP(ip);
    const stockData = [];

    for (let symbol of stocks) {
        const stockInfo = await fetchStockPrice(symbol.toUpperCase());

        // Handle likes
        if (like === 'true') {
            if (!stockLikes[symbol]) stockLikes[symbol] = new Set();
            stockLikes[symbol].add(ipHash);
        }
        stockInfo.likes = stockLikes[symbol] ? stockLikes[symbol].size : 0;
        stockData.push(stockInfo);
    }

    // If two stocks, calculate relative likes
    if (stockData.length === 2) {
        const [stock1, stock2] = stockData;
        stock1.rel_likes = stock1.likes - stock2.likes;
        stock2.rel_likes = stock2.likes - stock1.likes;
    }

    return stockData;
}

module.exports = { getStockData };
