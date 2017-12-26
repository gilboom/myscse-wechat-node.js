const Mongoose = require('./connection')
const Schema = Mongoose.Schema

const userSchema = new Schema({
        username:String,
        password:String,
        openId:String
})

const User = Mongoose.Model('User',userSchema)