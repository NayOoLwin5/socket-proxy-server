const Pusher = require('pusher');
const { watchChanges, ensureTable } = require('./rethinkdb');
const { subscribeToTopic } = require('./pubsub');

require('dotenv').config();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    host: process.env.PUSHER_HOST,
    port: process.env.PUSHER_PORT,
    encrypted: false,
    enabledTransports: ['ws']
});

console.log(`Connecting to Soketi server on port ${process.env.SOCKET_PORT}`);

const emitDataToSoketi = (channel, event, data) => {
    pusher
      .trigger(channel, event, data)
      .then((response) => {
        console.log("Data emitted successfully:", response.status);
      })
      .catch((error) => {
        console.error("Error emitting data to Soketi:", error);
      });
  }; 

const mqttTopic = 'test/topic2'; 
subscribeToTopic(mqttTopic, (topic, message) => {
    console.log(`Received message from MQTT topic ${topic}:`, message);
    emitDataToSoketi('my-channel', 'change', { topic, message });
});

ensureTable('messages').then(() => {
    watchChanges('messages', (change) => {
        console.log('Change detected in messages table:', change);
        emitDataToSoketi('my-channel', 'change', change);
    });
});