# Real-Time Data Synchronization Project

This project demonstrates a real-time data synchronization system using RethinkDB, MQTT, and Soketi (a Pusher-compatible WebSocket server). It allows for seamless data flow between different components and provides real-time updates to connected clients.

## Components

1. **RethinkDB**: A scalable NoSQL database that supports real-time change feeds.
2. **MQTT**: A lightweight messaging protocol for small sensors and mobile devices.
3. **Soketi**: An open-source, Pusher-protocol compatible server for WebSocket broadcasting.
4. **Node.js**: The runtime environment for our server-side applications.
5. **Supervisord**: A process control system used to manage and run Soketi in Docker.

## Setup and Running

1. Make sure you have Docker and Docker Compose installed on your system.

2. Set up environment variables in `.env` file.

3. Run the entire system using Docker Compose:
   ```
   docker compose up --build
   ```

   This command will build and start all the necessary containers, including RethinkDB, Soketi (managed by Supervisord), and your Node.js applications.

## Usage

1. The system will automatically watch for changes in the RethinkDB 'messages' table.
2. You can insert data into RethinkDB or publish to MQTT using the `rethinkInsertTest.js` script.
3. Any changes in RethinkDB or messages from MQTT will be broadcasted to connected clients via Soketi.
4. Soketi is managed by Supervisord within its Docker container, ensuring it stays running and can be easily restarted if needed.

## Testing

Run the `rethinkInsertTest.js` script to insert data into RethinkDB and publish to MQTT:
