const router = require('express').Router();
const { Logger } = require('@lo-agency/logger');
const Urls = require('../database/urls-repository');

router
    .get('/:shortUrl', (req, res) => {
        let url = Urls.getUrlCode(req.params.shortUrl)
        if (!url) {
            res.status(404).send({ error: 'Not Founded' });
            return;
        }
        res.redirect(/^(http|https)/.test(url.full) ? url.full : "http://" + url.full)
        Urls.updateViews(url.id)
    })

module.exports = router;