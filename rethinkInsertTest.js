const rethinkdb = require('rethinkdb');
const mqtt = require('mqtt');
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

async function publishToMQTT() {
    return new Promise((resolve, reject) => {
        const mqttClient = mqtt.connect(process.env.HIVEMQ_BROKER);

        mqttClient.on('connect', () => {
            console.log('Connected to HiveMQ broker');

            const topic = 'test/topic';
            const message = JSON.stringify({
                action: 'insert',
                data: "publish mqtt"
            });

            mqttClient.publish(topic, message, (err) => {
                if (err) {
                    console.error('Error publishing message:', err);
                    reject(err);
                } else {
                    console.log('Message published to MQTT topic:', topic);
                    resolve();
                }
                mqttClient.end();
            });
        });

        mqttClient.on('error', (error) => {
            console.error('MQTT connection error:', error);
            reject(error);
        });
    });
}


publishToMQTT();
// insertMessage();