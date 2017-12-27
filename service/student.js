const myscse = require('myscse-node')
const User = require('../model/userModel')
module.exports = {
        async getStudentInfo(openId) {
                const user = User.findUserByOpenId(openId)
                const context = myscse.login(user.username,user.password)
                return myscse.getUserInfo(context)
        },
        async getClassesInfo(openId) {

        },
        async getAttendanceInfo(openId) {

        },
        async getGradeInfo(openId) {
                
        }
}