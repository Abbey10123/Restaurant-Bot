const app = require("./app");
require("./cache").connect()
require ("./db").connectToMongoDB();



const port = 4500;


app.listen( port, ()=>{
    console.log(`app is running on ${port}`)
})
