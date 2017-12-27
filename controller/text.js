const textTemplate = require('../template/textTemplate')
const User = require('../model/userModel')
module.exports = async function (msg,res) {

        const _studentInfo = msg.Content.trim()
        let response,content
        if(!/(帐号)|(账号)/.test(_studentInfo) || !/密码/.test(_studentInfo) ) {
                content = '你输入的绑定信息不规范，请重试！'
                response = textTemplate(msg,content)
        }else {
                const username = getUsername(_studentInfo)
                const password = getPassword(_studentInfo)
                const openId = msg.FromUserName
                await saveUser(username,password,openId)
                content = `绑定成功`
                response = textTemplate(msg,content)
        } 
        res.send(response)

}

function getUsername(str) {
        const start  = str.search(/(帐号)|(账号)/)+2
        const end = str.search(/密码/)-1
        return str.substring(start,end).trim()
}

function getPassword(str) {
        const start = str.search(/密码/)+2
        return str.substring(start).trim()
}

async function saveUser(username,password,openId) {
        const user = new User({username,password,openId})
        await user.save()
}