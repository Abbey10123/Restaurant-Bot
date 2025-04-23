const ChatService = require ("../services/chat.service");

const checkMessage = async (req, res)=>{
    const payload = req.body;
    const checkMessageResponse = await ChatService.checkMessage({
        text: payload.text,
        sessionId: payload.sessionId,
        _id: payload._id,
        itemName: payload.itemName,
        quantity: payload.quantity
    })
    res.status(checkMessageResponse.code).json(checkMessageResponse)

}

const placeOrder = async (req, res)=>{
    const payload = req.body;
    const placeOrderResponse = await ChatService.placeOrder({
        sessionId: payload.sessionId,
        itemName: payload.itemName,
        quantity: payload.quantity
    })
    res.status(placeOrderResponse.code).json(placeOrderResponse)
}

const getOrder = async (req, res)=>{

    const payload = req.body;
    const getOrderResponse = await ChatService.getOrder({
        sessionId: payload.sessionId,
    })
    res.status(getOrderResponse.code).json(getOrderResponse)

}

const cancelOrder = async (req, res)=>{

    const _id = req.params._id
    const cancelOrderResponse = await ChatService.cancelOrder({
        _id: _id,
    })
    res.status(cancelOrderResponse.code).json(cancelOrderResponse)

}




module.exports = {checkMessage,
    placeOrder,
    getOrder,
    cancelOrder
}