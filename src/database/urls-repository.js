const db = require('./database');
const { Logger } = require('@lo-agency/logger');

const table = 'urls';

/**
 // Function for insert url and record in urls table from db
 * @param {String} fullUrl - full url from request body for shortened 
 * @param {Number} codeUrlLength - random code and string length for url as shortened, defaul is 5
 * @return {Object} - this function return row or record object inserted
 */
const insertUrl = (fullUrl, codeUrlLength = 5) => {
    const randomStr = Math.random().toString(36).slice(2, (+process.env.SHORT_URL_LENGTH || codeUrlLength) + 2);
    try {
        return getUrlId(
            db.prepare(` INSERT INTO ${table} (full, short) VALUES (?, ?)`).run(
                fullUrl,
                randomStr
            ).lastInsertRowid
        )
    } catch (error) {
        if (error.message === 'UNIQUE constraint failed: urls.short') {
            insertUrl(fullUrl, codeUrlLength);
        } else {
            throw new Error(error);
        }
    }
}

/**
 * Function for get all rows from urls table in db
 * @return {Array} - this function return collection as an array include record objects
 */
const getAllUrls = () => {
    return db.prepare(`SELECT * FROM ${table}`).all();
}

/**
 * Function for get rows or record from urls table in db by url shortened code
 * @param {string} urlCode - url code (unique string) for get row
 * @return {Object} - this function return row or record object inserted
 */
const getUrlCode = (urlCode) => {
    return db.prepare(`SELECT * FROM ${table} WHERE short=?`).get(urlCode);
}

/**
 * Function for get rows or record from urls table in db by url id
 * @param {Number} urlCode - url code (unique string) for get row
 * @return {Object} - this function return row or record object inserted
 */
const getUrlId = (urlId) => {
    return db.prepare(`SELECT * FROM ${table} WHERE id=?`).get(urlId);
}

/**
 * Function for get rows or record from urls table in db by url code
 * @param {Number} urlCode - url id for get row
 * @return {Object} - this function return object as changes result
 */
const updateViews = (urlId) => {
    return db.prepare(`UPDATE ${table} SET views=views+1 WHERE id=?`).run(urlId);
}

module.exports = {
    insertUrl,
    getAllUrls,
    getUrlCode,
    getUrlId,
    updateViews
};