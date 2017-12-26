const msgTypeList = require('../util/WeChat').config
const textController = require('../controller/text')
exports = module.exports = function (req,res) {
        const msg = req.body
        const type = msg.MsgType

        switch (type) {
                case 'text':
                        text(msg,res)
                        break
                case 'event':
                        event(msg,res)
                        break
                default:
                        break
        }
}
