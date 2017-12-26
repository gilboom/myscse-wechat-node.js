const MsgResponse = require('./MsgResponse')
class TextMsgResponse extends MsgResponse{
        constructor(Content) {
                super()
                //设置文本回复消息的内容
                this.Content = Content
                this.MsgType = 'Text'
        }
}