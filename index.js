require('dotenv').config();
const { PORT, NODE_ENV } = process.env;
const port = PORT || 3000;

const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

if (NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost:27017/shortenUrl', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Mongoose connection open!');
        }).catch(err => {
            console.log('Mongoose connection goes wrong!');
            console.log(err);
        });
}

app.use(express.static('./public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// API routes
app.use('/', [
    require('./server/routes/url_route'),
]);

// Page not found
app.use(function(req, res, next) {
    res.status(404).send('Page Not Found');
});

// Error handling
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => { console.log(`Listening on port: ${port}`); });

module.exports = app;