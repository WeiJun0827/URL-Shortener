console.log('Test Start');
const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { NODE_ENV } = process.env;
const { deleteFackData, createFakeData } = require('./fake_data_generator');

chai.use(chaiHttp);

const assert = chai.assert;
const requester = chai.request(app).keepOpen();

before(() => {
    if (NODE_ENV !== 'test') {
        throw 'Not in test env';
    }

    deleteFackData();
    createFakeData();
});

module.exports = {
    assert,
    requester
};