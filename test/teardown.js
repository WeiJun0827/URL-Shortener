const { requester } = require('./set_up');

after(async() => {
    requester.close();
});