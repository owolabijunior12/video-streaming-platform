const mongoose = require("mongoose");

const  DataBase = (url) =>{
    return  mongoose.connect(url,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
}
module.exports =  DataBase;