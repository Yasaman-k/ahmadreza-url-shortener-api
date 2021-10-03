const router = require('express').Router();
const { Logger } = require('@lo-agency/logger');
const Urls = require('../database/urls-repository');

router
    .route('/api/urls')

    .post((req, res) => {
        try {
            let url = req.body.url;
            if (!validUrl(url)) {
                res.status(422).send({ error: "check url key and value in body request!" });
                return;
            }
            res.status(200).send(Urls.insertUrl(url));
        } catch (error) {
            res.status(500).send({ error: "something went wrong!" });
            Logger.error(error.message);
        }
    })

    .get((req, res) => {
        try {
            res.status(200).send(Urls.getAllUrls());
        } catch (error) {
            res.status(500).send({ error: "something went wrong!" });
            Logger.error(error.message);
        }
    })

function validUrl(url) {
    return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(url);
}

module.exports = router;