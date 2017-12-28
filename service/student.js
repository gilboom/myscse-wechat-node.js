const myscse = require('myscse-node')
const User = require('../model/userModel')
module.exports = {
        async getStudentInfo(openId) {
                const user = await User.findUserByOpenId(openId)
                const context = await myscse.login(user.username,user.password)
                return myscse.getUserInfo(context)
        },
        async getClassesInfo(openId) {
                const user = await User.findUserByOpenId(openId)
                const context = await myscse.login(user.username,user.password)
                return myscse.getClasses(context)
        },
        async getExaminationTime(openId) {
                const user = await User.findUserByOpenId(openId)
                const context = await myscse.login(user.username,user.password)
                return myscse.getExaminationTime(context)
        },
        async getAttendanceInfo(openId) {
                const user = await User.findUserByOpenId(openId)
                const context = await myscse.login(user.username,user.password)
                return myscse.getAttendance(context)
        },
        async getRewardsPunishment(openId) {
                const user = await User.findUserByOpenId(openId)
                const context = await myscse.login(user.username,user.password)
                return myscse.getRewardsPunishment(context)
        },
        async getOfferedCourses(openId) {
                const user = await User.findUserByOpenId(openId)
                const context = await myscse.login(user.username,user.password)
                return myscse.getOfferedCourses(context)
        },
        async getIllegalInfo(openId) {
                const user = await User.findUserByOpenId(openId)
                const context = await myscse.login(user.username,user.password)
                return myscse.getIllegalInfo(context)
        },
        async getGrade(openId) {
                const user = await User.findUserByOpenId(openId)
                const context = await myscse.login(user.username,user.password)
                return myscse.getGrade(context)
        }
}
