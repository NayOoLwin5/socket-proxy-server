const proxySocket = require('./proxySocket');
const rethinkdb = require('./rethinkdb');
const pubsub = require('./pubsub');

// Proxy socket is already initialized in proxySocket.js
// RethinkDB and Pub/Sub logic runs through the proxy socket handlers

console.log('Proxy server with RethinkDB and Pub/Sub is running');
