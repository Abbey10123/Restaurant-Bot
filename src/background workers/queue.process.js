const Bull = require("bull");

const BackgroundQueue = ()=>{

    const redisHost = "127.0.0.1";
    const redisPort = "6379";
    const queueName = "menu";

    const workQueue = new Bull (queueName, {redis: {host: redisHost, port:redisPort}})


    const addToQueue = (data)=>{
        console.log("Adding to queue");
        workQueue.add(data)
        console.log(data)
    }
    console.log(addToQueue)

    return {addToQueue}
}
module.exports = BackgroundQueue;