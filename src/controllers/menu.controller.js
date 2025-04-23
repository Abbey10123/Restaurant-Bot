const MenuService = require("../services/menu.service");

const addMenu = async (req, res)=> {
    const payload = req.body;
    const addMenuResponse = await MenuService.addMenu({
        name: payload.name,
        price: payload.price
    })
    res.status(addMenuResponse.code).json(addMenuResponse)

}


module.exports = {addMenu}