/*jshint esversion: 6 */
/**
 * Load in Packages
 */
const express = require('express');
const app = express();
const config = require('./server.config.json');

/**
 * Homepage
 */
app.use(express.static('web'));

app.listen(config.port.internal, () => {
    console.log('Listening on port ' + config.port.internal + '!');
});

const mainView = __dirname + '/web/index/index.view.html';
app.get('/', (req, res) => {
    res.sendFile(mainView);
});