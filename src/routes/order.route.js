const ChatController = require("../controllers/chat.controller");
const Router = require ("express").Router;



const route = Router();

route.post("/", ChatController.placeOrder);

route.get("/", ChatController.getOrder)

route.delete("/:_id", ChatController.cancelOrder)


module.exports = route