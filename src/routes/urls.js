const router = require('express').Router();
const { Logger } = require('@lo-agency/logger');
const { validQuery, validUrl } = require('../helpers/validation');
const Urls = require('../database/urls-repository');

const prefix = '/api/urls'

// parameter structure and keys in the request query to verify and filter information
const getQuerySchema = {
    filter: {
        range: ['most-sites']
    },
    order: {
        range: ['views', 'created_at', 'full'],
    },
    sort: {
        range: ['asc', 'desc']
    },
    limit: {
        number: true,
    },
    part: {
        number: true,
    },
    search: null
}

router
    .post(prefix, (req, res) => {
        let url = req.body.url;
        // check the validity of the url entered by the client
        if (!validUrl(url)) {
            res.status(422).send({ error: "check url key and value in body request!" });
            return;
        }
        try {
            // register a record and url to shorten and save in the database
            res.status(200).send(Urls.insert(url));
        } catch (error) {
            res.status(500).send({ error: "something went wrong!" });
            Logger.error(error.message);
        }
    })

    .get(prefix, (req, res) => {
        // check the validity of the parameters in the request query
        // ff there is no parameter in the query, it is ignored by function
        let { result, message } = validQuery(getQuerySchema, req.query);
        if (!result) {
            res.status(400).send({ error: message });
            return;
        }
        try {
            /* Get all the urls in the database. If the parameter is in the query of the request,
            after being confirmed, the filtered information will be retrieved,
            otherwise, when the query parameters are empty, all records will be returned. */
            res.status(200).send(Urls.all(req.query));
        } catch (error) {
            res.status(500).send({ error: "something went wrong!" });
            Logger.error(error.message);
        }
    })

    .get(`${prefix}/:codeId`, (req, res) => {
        try {
            // get a registered url record using its id or abbreviated code
            let data = Urls.get(req.params.codeId)
            res.send(data ? (res.status(200), data) : (res.status(404), { error: 'not find!' }));
        } catch (error) {
            res.status(500).send({ error: "something went wrong!" });
            Logger.error(error.message);
        }
    })

module.exports = router;