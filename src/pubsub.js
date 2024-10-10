
const mqtt = require('mqtt');
require('dotenv').config();

const client = mqtt.connect(process.env.HIVEMQ_BROKER);

client.on('connect', () => {
    console.log('Connected to HiveMQ broker');
});

function publishMessage(topic, message) {
    client.publish(topic, message);
}

function subscribeToTopic(topic, callback) {
    client.subscribe(topic, () => {
        console.log(`Subscribed to topic: ${topic}`);
    });

    client.on('message', (topic, message) => {
        callback(topic, message.toString());
    });
}

module.exports = { publishMessage, subscribeToTopic };
