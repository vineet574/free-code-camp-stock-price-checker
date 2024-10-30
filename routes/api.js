const express = require('express');
const router = express.Router();
const { getStockData } = require('../controllers/stockController');

// Route to handle stock prices and likes
router.get('/stock-prices', async (req, res) => {
    const { stock, like } = req.query;
    
    // Anonymize IP address for privacy compliance
    const ip = req.ip;

    // Handle single or multiple stocks
    const stocks = Array.isArray(stock) ? stock : [stock];

    try {
        // Fetch stock data
        const stockData = await getStockData(stocks, like, ip);
        
        // Send response
        res.json({ stockData: stockData.length === 1 ? stockData[0] : stockData });
    } catch (error) {
        // Handle any errors that occur while fetching data
        res.status(500).json({ error: 'An error occurred while fetching stock data.' });
    }
});

module.exports = router;
