const msgTypeList = require('../util/WeChat').config
const textController = require('../controller/text')
const eventController = require('../controller/event')
exports = module.exports = async function (req,res) {
        const msg = req.body
        const type = msg.MsgType

        switch (type) {
                case 'text':
                        await textController(msg,res)
                        break
                case 'event':
                        eventController(msg,res)
                        break
                default:
                        break
        }
}
