const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
name:{type:String},
id:{type:Number},
email:{type:String},
passwordHash:{type:String}
})

   
module.exports = mongoose.model("user",userModel)