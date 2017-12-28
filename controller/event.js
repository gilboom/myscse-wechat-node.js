const textTemplate = require('../template/textTemplate')
const studentService = require('../service/student')
const log = console.log.bind(console)
module.exports = async function (msg,res) {

        const key = msg.EventKey
        let response,content;
        if(key === 'account_bind') {
                content = getBindRemindContent()
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
                        const examinationTime = await studentService.getExaminationTime(openId)
                        content = getExaminationTimeContent(examinationTime)
                        response = textTemplate(msg,content)
                                break
                        case 'attendance':
                        const attendance = await studentService.getAttendanceInfo(openId)
                        content = getAttendanceInfoContent(attendance)
                        response = textTemplate(msg,content)
                                break
                        case 'grade':
                        const grade = await studentService.getGrade(openId)
                        content = getGradeContent(grade)
                        response = textTemplate(msg,content)
                                break
                        case 'rewards_punishments':
                        const rewardsPunishment = await studentService.getRewardsPunishment(openId)
                        content = getRewardsPunishmentContent(rewardsPunishment)
                        response = textTemplate(msg,content)
                                break
                        case 'courses_offered':
                        const offeredCourses = await studentService.getOfferedCourses(openId)
                        content = getOfferedCoursesContent(offeredCourses)
                        response = textTemplate(msg,content)
                                break
                        case 'illegal':
                        const illegalInfo = await studentService.getIllegalInfo(openId)
                        content = getIllegalInfoContent(illegalInfo)
                        response = textTemplate(msg,content)
                                break
                }
                log('发送的信息是： '+response)
                res.send(response)
        }
}

function getBindRemindContent() {
        let content = ''
        content = content + '按以下格式发送帐号密码即可绑定：'
        content = content +'帐号 xxxxxxxxxx'
        content =content +'密码 xxxxxxxxxxxxxx'
        return content
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

function getExaminationTimeContent(examinationTime) {
        let content = ''
        let length = examinationTime.length
        for(let i = 0; i < length ;i++) {
                content = content + 
                                '科目：'+examinationTime[i]['name']+'\n'+
                                '日期：'+examinationTime[i]['date']+'\n'+
                                '时间：'+examinationTime[i]['time']+'\n'+
                                '考场：'+examinationTime[i]['placeName']+'\n'+
                                '座位号：'+examinationTime[i]['position']+'\n'+
                                '状态：'+examinationTime[i]['status']+'\n\n'
        }
        return content
}

function getAttendanceInfoContent(attendance) {
        let content = ''
        let length = attendance.length
        for(let i = 0; i < length ;i++) {
                content = content + 
                                '课程代码：'+attendance[i]['code']+'\n'+
                                '课程名称：'+attendance[i]['name']+'\n'+
                                '考勤状况：'+attendance[i]['attendance']+'\n\n'
        }
        return content
}

function getRewardsPunishmentContent(rewardsPunishment) {
        let content = '奖励：\n\n'
        const rewards = rewardsPunishment.rewards
        const punishment = rewardsPunishment.punishment
        let length = rewards.length
        for(let i = 0; i < length ;i++) {
                content = content + 
                                '学年：'+rewards[i]['year']+'\n'+
                                '学期：'+rewards[i]['term']+'\n'+
                                '奖励级别：'+rewards[i]['level']+'\n'+
                                '获奖原因：'+rewards[i]['reason']+'\n'+
                                '颁奖单位：'+rewards[i]['apartment']+'\n'+
                                '获奖日期：'+rewards[i]['date']+'\n\n'
        }
        length = punishment.length
        content = content + '处分：\n\n'
        for(let i = 0; i < length ;i++) {
                content = content + 
                                '学年：'+punishment[i]['year']+'\n'+
                                '学期：'+punishment[i]['term']+'\n'+
                                '处分级别：'+punishment[i]['level']+'\n'+
                                '处分原因：'+punishment[i]['reason']+'\n'+
                                '处分单位：'+punishment[i]['apartment']+'\n'+
                                '处分日期：'+punishment[i]['date']+'\n\n'
        }

        return content
}

function getOfferedCoursesContent(offeredCourses) {
        let content = '下学期开设的必修课程：\n\n'
        let length = offeredCourses.length
        for(let i = 0; i < length ;i++) {
                content = content + 
                                '课程代码：'+offeredCourses[i]['code']+'\n'+
                                '课程名称：'+offeredCourses[i]['name']+'\n'+
                                '课程学分：'+offeredCourses[i]['credit']+'\n'+
                                '考核方式：'+offeredCourses[i]['way']+'\n'+
                                '先修课程：'+offeredCourses[i]['advanced']+'\n'+
                                '同修课程：'+offeredCourses[i]['together']+'\n\n'
        }
        return content
}

function getIllegalInfoContent(illegalInfo) {
        let content = '违规用电记录：\n\n'
        const electricityViolation = illegalInfo.electricityViolation
        let length = electricityViolation.length
        for(let i = 0; i < length ;i++) {
                content = content + 
                                '学年：'+electricityViolation[i]['year']+'\n'+
                                '学期：'+electricityViolation[i]['term']+'\n'+
                                '宿舍号：'+electricityViolation[i]['dorm']+'\n'+
                                '违规日期：'+electricityViolation[i]['date']+'\n'+
                                '违规次数：'+electricityViolation[i]['times']+'\n'+
                                '停电天数：'+electricityViolation[i]['days']+'\n'+
                                '违规原因：'+electricityViolation[i]['reason']+'\n'+
                                '是否为责任人：'+electricityViolation[i]['isResponsible']+'\n\n'
        }
        content = content + '晚归次数：'+illegalInfo.lateBack+'\n'
        content = content + '停电次数：'+illegalInfo.stopElectricity+'\n'
        return content
}

function getGradeContent(grade) {
        let content = '学年：'+grade.year+ '\n\n'
        content = content +'必修：\n\n'
        content = content +'第一学期：\n'
        grade.requiredGrade.first.forEach(subject => {
                content = content +subject.name +'：' +subject.score+ '\n'
        });
        content = content +'\n'
        content = content +'第二学期：\n'
        grade.requiredGrade.second.forEach(subject => {
                content = content +subject.name +'：' +subject.score+ '\n'
        });
        content = content +'\n'
        content = content +'选修：\n\n'
        content = content +'第一学期：\n'
        grade.electiveGrade.first.forEach(subject => {
                content = content +subject.name +'：' +subject.score+ '\n'
        });
        content = content +'\n'
        content = content +'第二学期：\n'
        grade.electiveGrade.second.forEach(subject => {
                content = content +subject.name +'：' +subject.score+ '\n'
        });
        return content
}