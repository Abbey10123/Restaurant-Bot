const Bull = require("bull");
const MenuModel = require("../model/menu.model");
const cache = require("../../cache");
const orderModel = require("../model/order.model");
const {getOrder} = require("../services/chat.service");
const {cancelOrder} = require("../services/chat.service");
const {placeOrder} = require ("../services/chat.service")

const BackgroundQueue = ()=>{

    const redisHost = "127.0.0.1";
    const redisPort = "6379";
    const queueName = "menu";

    const workQueue = new Bull (queueName, {redis: {host: redisHost, port:redisPort}})


    const listenToQueue = (jobs)=>{
        workQueue.process(async (job, done) =>{
            console.log("I am here");
            const {jobName, sessionId, itemName, quantity,_id} =job.data;
            let responseText = "Invalid option.";

            switch (jobName) {
                case "1":
                    const listMenu = await MenuModel.find()
                    responseText =   "Here is our menu:\n" +
                    listMenu.map((item, i) => `${i + 1}. ${item.name} - ₦${item.price}`).join("\n");                    
                    console.log("Listing Menu")
                    break;
                case "99":
                    const sendOrder = await placeOrder({sessionId, itemName, quantity})
                    if (sendOrder.success ) {
                        responseText = sendOrder.data
                    }
                    console.log("Checkout order") 
                    break;
                case "98":
                    const orderResponse = await getOrder({ sessionId});
                    if (orderResponse.success && orderResponse.data.length > 0) {
                        responseText = orderResponse.data
                    }
                        else {
                            responseText = "No order history found.";
                        }

                    console.log("Order history")
                    break;
                case "97":
                    const newOrder = await getOrder({ sessionId});
                    if (newOrder.success && newOrder.data.length > 0) {
                        const lastOrder = newOrder.data[newOrder.data.length - 1];

                        responseText = lastOrder
                    }
                        else {
                            responseText = "No order history found.";
                        }
                    console.log("Current order")
                    break;
                case "0":
                    const delOrder = await cancelOrder({_id: job.data._id})
                    if (delOrder.success){
                    responseText = "Order Cancelled"
                    }
                    else {
                        responseText= delOrder.message
                    }
                    console.log("Cancel order")
                                       
                    break;
                default:
                    console.log("Please select ")
            }
            const cacheKey = `session:${sessionId}:response`
            await cache.redis.set(cacheKey, JSON.stringify(responseText), { EX: 24 * 60 * 60 * 7 })
            const cachedData = await cache.redis.get(cacheKey);
            console.log("Parsed cached data:", JSON.parse(cachedData));
            done()

        })
        workQueue.on("completed", (job, result)=>{
            console.log(`Job ${job.id} is completed`);

        })

        workQueue.isReady().then(()=>{
            console.log("Worker queue is ready")
        }).catch((err) => {
            console.error("❌ Worker queue error:", err);
        });

    }

    return {listenToQueue}
}

module.exports = BackgroundQueue;