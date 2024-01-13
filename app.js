const  express = require("express");
const app = express();
require("dotenv").config()
const PORT =5000;
const expressWs = require('express-ws')(app);
const videoRouter = require('./routes/video');

const mongoDb = require("./Database");

app.use(express.static("./public"));
app.use(express.json())
// app.use('/video', videoRouter);



const Server = async () =>{
    try{
    //    await  mongoDb(process.env.DB_STRING)
        app.listen(PORT,()=>{
                console.log(`server running on https://Localhost:${PORT}`);
            })
    }catch(error){
        console.log(error);
        console.log("Something went wrong on the server it might be the network")
    }
}
Server()
