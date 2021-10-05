const fs = require('fs');
const { Logger } = require('@lo-agency/logger');
const betterSqlite3 = require('better-sqlite3');

/*
create database file(if isnt exists) and connection for export it.
with each database transaction, a log is taken from the query.
when the program is exit, the connection between the database is disconnected.
*/
const db = new betterSqlite3(process.env.DB_PATH || `${__dirname}/main.db`, { verbose: (message) => Logger.info(`DB-QUERY: ${message}`) });
process.on('exit', () => db.close())

/*
use db-setup flag - accept db-setup arguments from the execute command project
if there is, all sql commands in the migrations.sql file are executed.
*/
if (process.argv.includes('db-setup')) {
    fs.readFile(`${__dirname}/migrations.sql`, { encoding: 'utf-8' }, (error, data) => {
        if (error) {
            Logger.error(error.message);
            return;
        }
        db.exec(data);
    })
}

module.exports = db;