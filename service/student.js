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
        async getAttendanceInfo(openId) {

        },
        async getGradeInfo(openId) {
                
        }
}
