const express = require('express');

module.exports = [
    require('@lo-agency/logger').morganMiddleware,
    express.json(),
    (err, req, res, next) => {
        if (['POST', 'PUT'].includes(req.method) && err) {
            return res.status(400).send({ error: "invalid json in the body of the request! please check the structure and syntax of json." });
        }
        next()
    },
    express.urlencoded({ extended: true }),
    express.static(`./public`),
    require('../routes/urls'),
    require('../routes/redirect')
]