const Mongoose = require('./connection')
const Schema = Mongoose.Schema
const WeChat = require('../util/WeChat')
const EXPIRE_TIME = 7100

const accessTokenSchema = new Schema({
        access_token:String,
        createTime:{
                type:Mongoose.SchemaTypes.Date,
        }
})

accessTokenSchema.index({createTime:1},{expireAfterSeconds:EXPIRE_TIME})

accessTokenSchema.statics.addAccessToken = async function() {

        const access_token = await WeChat.getAccessToken()

        const token = new AccessToken({
                access_token:access_token,
                createTime:new Date()
        })
        try{
                await token.save()
        }catch(err) {
                return err
        }
        return token
}

accessTokenSchema.statics.getAccessToken = async function() {
        try{
                //从数据库中查找access_token
                const access_token = await this.findOne({})
                //如果数据库中不存在access_token，就发送请求到微信服务器获取新的access_token
                if(!access_token) return this.addAccessToken()
                else return access_token
        }catch(e) {
                return e
        }
}

const AccessToken = Mongoose.model("AccessToken",accessTokenSchema,'access_token')

exports = module.exports = AccessToken

