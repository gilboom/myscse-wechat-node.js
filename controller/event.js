const textTemplate = require('../template/textTemplate')
const studentService = require('../service/student')
module.exports = function (msg,res) {

        const key = msg.EventKey
        let response,content;
        if(key === 'account_bind') {
                content = `按以下格式发送帐号密码即可绑定：
                帐号 xxxxxxxxxx
                密码 xxxxxxxxxxxxxx`
                response = textTemplate(msg,content)
                res.send(response)
        }else {
                const openId = msg.FromUserName

                switch (key) {
                        case 'student_info':
                        // studentService.getStudentInfo()
                                break
                        case 'classes':
                                break
                        case 'examination_time':
                                break
                        case 'attendance':
                                break
                        case 'grade':
                                break
                        case 'rewards_punishments':
                                break
                        case 'courses_offered':
                                break
                        case 'illegal':
                                break
                }
        }
}