module.exports = (msg,content)=> {
        const template = 
        `<xml>
                <ToUserName><![CDATA[${msg.FromUserName}]]></ToUserName>
                <FromUserName><![CDATA[${msg.ToUserName}]]></FromUserName> 
                <CreateTime>${new Date().getTime()}</CreateTime>
                <MsgType><![CDATA[text]]></MsgType> 
                <Content><![CDATA[${content}]]></Content> 
        </xml>`
        return template
}

