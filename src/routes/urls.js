const router = require('express').Router();
const { Logger } = require('@lo-agency/logger');
const Urls = require('../database/urls-repository');

router
    .route('/api/urls')
    .post((req, res) => {
        let url = req.body.url
        if (!validUrl(url)) {
            res.status(400).send({ error: 'check url' });
            return;
        }
        res.status(200).send(Urls.insertUrl(url))
    })
    .get((req, res) => {
        res.status(200).send(Urls.getAllUrls())
    })

function validUrl(url) {
    return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(url)
}

module.exports = router;