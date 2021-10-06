const express = require('express');

module.exports = [
    // to log any request from http
    require('@lo-agency/logger').morganMiddleware,

    // to access the body of http requests
    express.json(),
    
    /*
    check the json in the body of the request. To avoid the problem of displaying errors and project information on the user side.
    when a json invalid is sent, all the contents of the file and the information related to the project are displayed with an error.
    */
   (err, req, res, next) => {
       if (['POST', 'PUT'].includes(req.method) && err) {
           return res.status(400).send({ error: "invalid json in the body of the request! please check the structure and syntax of json." });
        }
        next()
    },

    // to access the form url encoded http requests
    express.urlencoded({ extended: true }),

    // serve static files exist in public folder
    express.static(`./public`),

    // use the defined and required routes of the program - urls and redirect routes
    require('../routes/urls'),
    require('../routes/redirect')
]