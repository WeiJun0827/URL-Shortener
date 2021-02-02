require('dotenv').config();
const { NODE_ENV } = process.env;
const mongoose = require('mongoose');
const Url = require('../server/models/url_model');
const { urls } = require('./fake_data');

mongoose.connect('mongodb://localhost:27017/shortenUrlTest', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongoose connection open!');
    }).catch(err => {
        console.log('Mongoose connection goes wrong!');
        console.log(err);
    });

function createFakeData() {
    if (NODE_ENV !== 'test') {
        console.log('Not in test env');
        return;
    }

    return Url.insertMany(urls)
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
}

function deleteFackData() {
    if (NODE_ENV !== 'test') {
        console.log('Not in test env');
        return;
    }

    return Url.deleteMany({})
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
}

module.exports = {
    createFakeData,
    deleteFackData
};