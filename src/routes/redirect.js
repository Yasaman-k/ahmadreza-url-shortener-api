const router = require('express').Router();
const { join } = require('path')
const { Logger } = require('@lo-agency/logger');
const Urls = require('../database/urls-repository');

router
    .get(join('/', process.env.REDIRECT_PATH, '/:shortUrl'), (req, res) => {
        try {
            /* Get the full link from the database according to the
            short link received in the redirect route parameters */
            let url = Urls.get(req.params.shortUrl);
            if (!url) {
                res.status(404).send({ error: 'not found!' });
                return;
            }

            /* Redirect the user to the full url if any. After being redirected,
            the number of visits to the shortened link in the database will increase */
            res.redirect(/^(https?:\/\/)/.test(url.full) ? url.full : "http://" + url.full);
            Urls.updateViews(url.id);
            
        } catch (error) {
            res.status(500).send({ error: "something went wrong!" });
            Logger.error(error.message)
        }
    })

module.exports = router;