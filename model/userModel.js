const Mongoose = require('./connection')
const Schema = Mongoose.Schema

const userSchema = new Schema({
        username:String,
        password:String,
        openId:String
})

userSchema.statics.findUserByOpenId = async function(openId) {
        return this.findOne({openId})
}

const User = Mongoose.model('User',userSchema)

module.exports = User