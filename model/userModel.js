const Mongoose = require('./connection')
const Schema = Mongoose.Schema

const userSchema = new Schema({
        username:String,
        password:String,
        openId:String
})

const User = Mongoose.model('User',userSchema)

module.exports = User