const router = require('express').Router();
const { wrapAsync } = require('../../util/util');
const {
    checkUrl,
    createHash,
    checkShortenUrl,
    checkCache,
    getOriginalUrl,
} = require('../controllers/url_controller');

router.route('/shortenUrl').post([
    checkUrl,
    wrapAsync(createHash),
]);

router.route('/:hash').get([
    checkShortenUrl,
    wrapAsync(checkCache),
    wrapAsync(getOriginalUrl)
]);

module.exports = router;