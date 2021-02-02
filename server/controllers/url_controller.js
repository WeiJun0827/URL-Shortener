const validator = require('validator');
const Url = require('../models/url_model');
const Cache = require('../../util/cache');
const EXPIRY_SEC = 60 * 60 * 24 * 7;

const checkUrl = (req, res, next) => {
    const { url } = req.body;
    if (!url || url === '')
        return res.status(400).send('URL was not provided');

    const isUrl = validator.isURL(url);
    if (!isUrl)
        return res.status(400).send('Invalid URL format');

    next();
};

const createHash = async(req, res, next) => {
    const { url } = req.body;
    let hash;
    let searchResult;
    do {
        hash = createRandomString(6);
        searchResult = await Url.findOne({ hash });
    } while (searchResult !== null);

    const shortenUrl = new Url({ hash, originalUrl: url });
    await shortenUrl.save();

    const domain = req.get('host');
    res.status(200).send({ shortenUrl: domain + '/' + hash });
    if (Cache.client.ready) {
        await Cache.set(hash, url);
        await Cache.expire(hash, EXPIRY_SEC);
    }
};

const createRandomString = (digits) => {
    let result = '';
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < digits; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
};

const checkShortenUrl = (req, res, next) => {
    const { hash } = req.params;
    if (!hash || hash === '')
        return res.status(400).send('Shorten URL was not provided');
    const regExp = new RegExp('^[a-zA-Z0-9]{6,8}$');
    const isValid = regExp.test(hash);
    if (!isValid)
        return res.status(400).send('Invalid shorten URL');
    next();
};

const checkCache = async(req, res, next) => {
    const { hash } = req.params;
    try {
        if (Cache.client.ready) {
            const originalUrlCache = await Cache.get(hash);
            if (originalUrlCache !== null)
                return res.status(301).redirect(originalUrlCache);
        }
        next();
    } catch (error) {
        console.error(`Get cache error: ${error}`);
    }
};

const getOriginalUrl = async(req, res) => {
    const { hash } = req.params;
    const result = await Url.findOne({ hash });
    if (result == null)
        res.status(301).redirect('/');
    const { originalUrl } = result;
    res.status(301).redirect(originalUrl);

    try {
        if (Cache.client.ready) {
            await Cache.set(hash, originalUrl);
            await Cache.expire(hash, EXPIRY_SEC);
        }
    } catch (error) {
        console.error(`Set cache error: ${error}`);
    }
};

module.exports = {
    checkUrl,
    createHash,
    checkShortenUrl,
    checkCache,
    getOriginalUrl,
};