const fs = require('fs');
const { Logger } = require('@lo-agency/logger');
const betterSqlite3 = require('better-sqlite3');
const db = new betterSqlite3(process.env.DB_PATH || `${__dirname}/main.db`, { verbose: (message) => Logger.info(`DB-QUERY: ${message}`) });

if (process.argv.includes('db-setup')) {
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