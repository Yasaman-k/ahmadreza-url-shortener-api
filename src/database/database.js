const fs = require('fs');
const { Logger } = require('@lo-agency/logger');
const betterSqlite3 = require('better-sqlite3');

const dbPath = process.env.DB_PATH || `${__dirname}/main.db`;
let db = undefined;

if (fs.existsSync(dbPath)) {
    db = new betterSqlite3(dbPath);
} else {
    db = new betterSqlite3(dbPath);
    fs.readFile(`${__dirname}/migrations.sql`, { encoding: 'utf-8' }, (error, data) => {
        if (error) {
            Logger.error(error.message);
            return;
        }
        db.exec(data);
    })
}

process.on('exit', () => db.close())

module.exports = db;