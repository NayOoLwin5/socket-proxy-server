const PusherClient = require('pusher-js');
require('dotenv').config();

const pusherClient = new PusherClient(process.env.PUSHER_KEY, {
    wsHost: process.env.PUSHER_HOST || 'localhost',
    wsPort: process.env.PUSHER_PORT || 6001,
    forceTLS: false,
    enabledTransports: ['ws'],
    cluster: process.env.PUSHER_CLUSTER || 'mt1'
});

const channel = pusherClient.subscribe('my-channel');

channel.bind('change', (data) => {
    console.log('Received db-change event:', data);
});

console.log('Client server listening to Pusher events...');