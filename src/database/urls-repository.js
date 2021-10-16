const db = require('./database');

const table = 'urls';

/**
 // function for insert url and record in urls table from db
 * @param {String} fullUrl - full url from request body for shortened 
 * @param {Number} codeUrlLength - random code and string length for url as shortened, defaul is 5
 * @return {Object} - this function return row or record object inserted
 */
const insert = (fullUrl) => {
    const randomStr = Math.random().toString(36).slice(2, (+process.env.SHORT_URL_LENGTH || 5) + 2);
    try {
        return db.prepare(`SELECT * FROM ${table} WHERE id=?`).get(
            db.prepare(` INSERT INTO ${table} (full, short) VALUES (?, ?)`).run(
                fullUrl,
                randomStr
            ).lastInsertRowid
        )
    } catch (error) {
        if (error.message === 'UNIQUE constraint failed: urls.short') {
            insert(fullUrl);
        } else {
            throw new Error(error);
        }
    }
}

/**
 * function for get all filtered rows from urls table in db 
 * @param {Object} - this function takes an object parameter containing the approved keys to filter the record and all available urls.
 * @return {Object} - this function return collection as an array include filtered record objects
 */
const all = ({ filter = '', search = '', order = 'id', sort = 'asc', limit = -1, part = 0 }) => {

    let query = '';
    switch (filter) {
        case 'most-sites':
            query = `SELECT COUNT(full) AS count,full AS url,SUM(views) AS views FROM ${table}`;
            break;
        default:
            query = `SELECT * FROM ${table}`;
            break;
    }

    let data = {};
    query += ` WHERE full LIKE @search ${filter ? 'GROUP BY full' : ''} ORDER BY ${order} ${sort.toUpperCase()}`;
    data = db.prepare(query).all({ search: `%${search}%` });
    let total = data.length;
    let parts = Math.ceil(total / limit);

    if (limit >= 0) {
        query += ` LIMIT @limit OFFSET @part`;
        data = db.prepare(query).all({ search: `%${search}%`, limit: limit, part: limit * part });
    }

    const result = {
        urls: data,
        total: total,
        limit: limit < 0 ? null : limit,
        parts: parts < 0 ? null : parts
    }

    return result;
}

/**
 * function for get rows or record from urls table in db by url id or short code
 * @param {Number|String} codeId - url code (unique string) or url id for get row
 * @return {Object} - this function return row or record object inserted
 */
const get = (codeId) => {
    return db.prepare(`SELECT * FROM ${table} WHERE id =@codeId OR short =@codeId`).get({ codeId: codeId });
}

/**
 * function for get rows or record from urls table in db by url code
 * @param {Number} urlCode - url id for get row
 * @return {Object} - this function return object as changes result
 */
const updateViews = (urlId) => {
    return db.prepare(`UPDATE ${table} SET views = views + 1 WHERE id =? `).run(urlId);
}

module.exports = {
    insert,
    all,
    get,
    updateViews,
};