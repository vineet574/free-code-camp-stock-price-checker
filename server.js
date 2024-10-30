const express = require('express');
const helmet = require('helmet');
const apiRoutes = require('./routes/api.js');

const app = express();

// Security headers
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],          // Default policy for loading content
        scriptSrc: ["'self'"],           // Only allow scripts from the same origin
        styleSrc: ["'self'"],            // Only allow styles from the same origin
        imgSrc: ["'self'"],              // Only allow images from the same origin
        connectSrc: ["'self'"],          // Only allow connections (e.g., APIs) from the same origin
        frameSrc: ["'self'"],            // Allow iframes only from the same origin
        fontSrc: ["'self'"],             // Allow fonts only from the same origin
        objectSrc: ["'none'"],           // Block all object sources
        upgradeInsecureRequests: []       // Automatically upgrade HTTP requests to HTTPS
    }
}));

// Routes
app.use('/api', apiRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
