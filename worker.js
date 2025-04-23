const Background = require("./src/background workers/queue.worker")
require ("./db").connectToMongoDB();
require("./cache").connect()

const workerApp = Background()

console.log("Worker starting...");

workerApp.listenToQueue()