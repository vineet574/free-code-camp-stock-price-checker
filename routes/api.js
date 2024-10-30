const express = require('express');
const router = express.Router();
const { getStockData } = require('../controllers/stockController');

// Route to handle stock prices and likes
router.get('/stock-prices', async (req, res) => {
    const { stock, like } = req.query;
    const ip = req.ip;

    // Handle single or multiple stocks
    const stocks = Array.isArray(stock) ? stock : [stock];
    const stockData = await getStockData(stocks, like, ip);

    res.json({ stockData: stockData.length === 1 ? stockData[0] : stockData });
});

module.exports = router;
