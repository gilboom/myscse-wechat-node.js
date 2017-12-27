const textTemplate = require('../template/textTemplate')
const studentService = require('../service/student')
const log = console.log.bind(console)
module.exports = async function (msg,res) {

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
                        const studentInfo = await studentService.getStudentInfo(openId)
                        content = getStudentInfoContent(studentInfo)
                        response = textTemplate(msg,content)
                                break
                        case 'classes':
                        const classes = await studentService.getClassesInfo(openId)
                        content = getClassesInfoContent(classes)
                        response = textTemplate(msg,content)
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
                log('发送的信息是： '+response)
                res.send(response)
        }
}

function getStudentInfoContent(studentInfo) {
        return `学号：${studentInfo.get('学号')}
        姓名：${studentInfo.get('姓名')}
        年级：${studentInfo.get('年级')}
        专业：${studentInfo.get('专业')}
        身份证：${studentInfo.get('身份证')}
        电子邮箱：${studentInfo.get('电子邮箱')}
        行政班：${studentInfo.get('行政班')}
        班主任：${studentInfo.get('班主任')}
        辅导员：${studentInfo.get('辅导员')}`
}

function getClassesInfoContent(classes) {
        let content = ''
        for(let i = 1 ; i<= 5;i++ ) {
                const day = classes.get(i)
                content = content + '星期'+i + '\n'
                for(let j = 1;j<=8;j++) {
                        let nums = `第${1+2*(j-1)}-${1+1+2*(j-1)}节`
                let className = day.get(nums).replace(/\(.*\)/,'')
                        content = content +nums+'  '+className+'\n'
                }
        }
        return content
}
