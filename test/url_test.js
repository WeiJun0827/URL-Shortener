const { assert, requester } = require('./set_up');
const { urls } = require('./fake_data');

describe('Url', async() => {
    it('create hash', async() => {
        const body = {
            url: 'https://www.google.com.tw/'
        };

        const res = await requester
            .post('/shortenUrl')
            .send(body);

        const { shortenUrl } = res.body;

        assert.isString(shortenUrl);
    });

    it('get original URL from hash', async() => {
        for (const url of urls) {
            const res = await requester
                .get('/' + url.hash)
                .redirects(0);

            const { location } = res.header;

            assert.equal(res.status, 302);
            assert.equal(location, url.originalUrl);
        }
    });
});