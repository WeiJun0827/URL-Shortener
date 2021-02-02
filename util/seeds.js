const mongoose = require('mongoose');
const Url = require('../server/models/url_model');

mongoose.connect('mongodb://localhost:27017/shortenUrl', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongoose connection open!');
    }).catch(err => {
        console.log('Mongoose connection goes wrong!');
        console.log(err);
    });

const seedUrl = [{
        hash: 'Google',
        originalUrl: 'https://www.google.com.tw/'
    },
    {
        hash: 'Amazon',
        originalUrl: 'https://www.amazon.com/'
    },
    {
        hash: 'GitHub',
        originalUrl: 'https://github.com/'
    },
    {
        hash: 'LineTV',
        originalUrl: 'https://www.linetv.tw/'
    },
    {
        hash: 'WeiJun',
        originalUrl: 'https://github.com/WeiJun0827'
    }
];

Url.insertMany(seedUrl)
    .then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });