
const rethinkdb = require('rethinkdb');
require('dotenv').config();

let connection = null;

async function connectToRethinkDB() {
    if (connection) return connection;
    try {
        connection = await rethinkdb.connect({
            host: process.env.RETHINKDB_HOST,
            port: process.env.RETHINKDB_PORT,
            db: process.env.RETHINKDB_DB
        });
        console.log('Connected to RethinkDB');
        return connection;
    } catch (error) {
        console.error('RethinkDB Connection Error:', error);
        throw error;
    }
}

async function watchChanges(tableName, callback) {
    try {
        await ensureTable(tableName);
        const conn = await connectToRethinkDB();
        rethinkdb.table(tableName).changes().run(conn, (err, cursor) => {
            if (err) throw err;
            cursor.each((err, row) => {
                if (err) throw err;
                callback(row);
            });
        });
    } catch (error) {
        console.error('Error watching table:', error);
    }
}

async function ensureTable(tableName) {
    const conn = await connectToRethinkDB();
    const tableList = await rethinkdb.tableList().run(conn);
    if (!tableList.includes(tableName)) {
        await rethinkdb.tableCreate(tableName).run(conn);
        console.log(`Table '${tableName}' created.`);
    }
}

module.exports = { watchChanges, ensureTable };
