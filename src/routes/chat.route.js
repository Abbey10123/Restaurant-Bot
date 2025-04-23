const ChatController = require("../controllers/chat.controller");
const Router = require ("express").Router;



const route = Router();

route.post("/chat", ChatController.checkMessage);

route.get("/chat", (req, res) => { 
    res.json(
    { message: "Bot is here" })
});
module.exports = route