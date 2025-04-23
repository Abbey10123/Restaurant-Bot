const UserModel = require ("../model/chat.model")
const BackgroundQueue = require("../background workers/queue.process");
const { v4: uuidv4 } = require('uuid');
const cache = require ("../../cache")
const MenuModel = require("../model/menu.model");
const waitForCache = require("../helpers/cachedelay");
const OrderModel = require("../model/order.model");


const checkMessage = async({
    text, 
    sessionId,
    _id,
    itemName,
    quantity
    })=>{
    try{
        const activeId = sessionId || uuidv4();
         BackgroundQueue().addToQueue({
            jobName: text,
            sessionId: activeId,
            _id: _id,
            itemName: itemName,
            quantity: quantity
           });
           console.log(text)
           if (text === "98") {
            const orders = await OrderModel.find({sessionId} );
            if (!orders.length) {
                return {
                  code: 404,
                  success: false,
                  message: "No order history found for this session.",
                };
              }
              return {
                code: 200,
                success: true,
                message: "Order history retrieved successfully.",
                data: orders,
              };
           }
        const cacheKey = `session:${activeId||sessionId}:response`;
        const cachedData = await waitForCache(cacheKey)
        return{
            code: 201,
            success: true,
            message: "Bot responding",
            data: JSON.parse(cachedData)
        }
    }
    catch(error){
        return{
            code: 500,
            success: false,
            message: error.message
        }
    }
}
const placeOrder = async({sessionId, itemName, quantity})=>{
    try {
            const menuItem = await MenuModel.findOne({name:itemName})
            if (!menuItem) {
                return {
                    code: 400,
                    success: false,
                    message: `Item "${itemName}" not found on the menu`
                };
            }
            const totalPrice = menuItem.price * quantity;
            const newOrder = await OrderModel.create({
            sessionId,
            itemName: menuItem.name,
            quantity,
            price: menuItem.price,
            totalPrice: totalPrice,
        });

        const cacheKey = `session:${sessionId}:response`;
        const cachedData = await cache.redis.set(cacheKey, JSON.stringify(newOrder), { EX: 60 * 60 * 24 * 7 });

        return {
            code: 201,
            success: true,
            message: "Order placed successfully",
            data: newOrder

        };

        
    } catch (error) {
        return{
        code: 500,
        success: false,
        message: error.message}
    }
}

const getOrder = async({sessionId}) =>{
    try {
        
        const listOrder = await OrderModel.find({sessionId})
        if (!listOrder){
            return{
                code: 400,
                success: false,
                message: "No order available"
            }

        }
        return{
            code: 200,
            success: true,
            message: "List of Orders",
            data: listOrder
        }
    } catch (error) {
        return{
            code: 500,
            success: false,
            message: error.message
        }
    }
}

const cancelOrder = async({_id}) => {
    try {
        const findOrder = await OrderModel.findOne({_id});
        if (!findOrder){
            return{
                code: 400,
                success: false,
                message: "Order not found"
            }
        }
        const delOrder = await findOrder.deleteOne({_id});
        return{
            code: 200,
            success: true,
            message: "Order cancelled"
        }
    } catch (error) {
        return{
            code: 500,
            success: false,
            message: error.message
        }
    }

}



module.exports = {checkMessage,
    placeOrder,
    getOrder,
    cancelOrder
}