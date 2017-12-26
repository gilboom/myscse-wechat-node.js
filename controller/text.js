const textTemplate = require('../template/textTemplate')
module.exports = function (msg,res) {

        const _studentInfo = msg.Content.trim()
        let response,content
        if(!/帐号/.test(_studentInfo) || !/密码/.test(_studentInfo) ) {
                content = '你输入的绑定信息不规范，请重试！'
                response = textTemplate(msg,content)
        }else {
                const username = getUsername(_studentInfo)
                const password = getPassword(_studentInfo)
                const openId = msg.FromUserName
                content = 
                `你绑定的信息是：
                用户名：${username}
                密码：${password}
                openID：${openId}
                `
                response = textTemplate(msg,content)
        } 
        res.send(response)

}

function getUsername(str) {
        const start  = str.search(/帐号/)+2
        const end = str.search(/密码/)-1
        return str.substring(start,end).trim()
}

function getPassword(str) {
        const start = str.search(/密码/)+2
        return str.substring(start).trim()
}