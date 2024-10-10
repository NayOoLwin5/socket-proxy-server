const rethinkdb = require('rethinkdb');
require('dotenv').config();

async function insertMessage() {
    let connection;
    try {
        connection = await rethinkdb.connect({
            host: process.env.RETHINKDB_HOST,
            port: process.env.RETHINKDB_PORT,
            db: process.env.RETHINKDB_DB
        });

        const result = await rethinkdb.table('messages').insert({
            text: 'Hello, RethinkDB!',
            timestamp: new Date()
        }).run(connection);

        console.log('Inserted message:', result);
    } catch (error) {
        console.error('Error inserting message:', error);
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

insertMessage();