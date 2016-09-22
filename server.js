/**
 * Load in Packages
 */
const express = require('express');
const app = express();

/**
 * Initialize global constants
 */
const PORT = 3000;

/**
 * Homepage
 */
app.use(express.static('web'));

app.listen(PORT, () => {
    console.log('Example app listening on port 3000!');
});