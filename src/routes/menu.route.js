const MenuController = require("../controllers/menu.controller");
const Router = require ("express").Router;



const route = Router();

route.post("/addmenu", MenuController.addMenu);


module.exports = route