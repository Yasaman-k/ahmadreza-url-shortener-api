const router = require('express').Router();
const { Logger } = require('@lo-agency/logger');
const Urls = require('../database/urls-repository');

router
    .get(`${process.env.REDIRECT_PATH}/:shortUrl`, (req, res) => {
        try {
            let url = Urls.getUrlCode(req.params.shortUrl);
            if (!url) {
                res.status(404).send({ error: 'not found!' });
                return;
            }
            res.redirect(/^(https?:\/\/)/.test(url.full) ? url.full : "http://" + url.full);
            Urls.updateViews(url.id);
        } catch (error) {
            res.status(500).send({ error: "something went wrong!" });
            Logger.error(error.message)
        }
    })

module.exports = router;