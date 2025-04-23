const MenuModel = require("../model/menu.model");

const addMenu = async ({name, price}) => {
    try {
        const create = await MenuModel.create({
            name, 
            price
        })
        return {
            code: 201,
            message: "Menu created Successfully",
            data: {create}
        }
    } catch (error) {
        return{
      code: 500,
      success: false,
      data: null,
      message: error.message}
    }
}



module.exports = {addMenu}