const myscse = require('myscse-node')
const log = console.log.bind(console)

async function  main(params) {
        const context = await myscse.login('1540129359','15441502102130')
        // const studentInfo = await myscse.getUserInfo(context)
        // log(studentInfo)
        // const classes = await myscse.getClasses(context)
        // log(classes)
        // const attendance = await myscse.getAttendance(context)
        // log(attendance)
        // const examinationTime = await myscse.getExaminationTime(context)
        // log(examinationTime)
        const rewardsPunishment = await myscse.getRewardsPunishment(context)
        log(rewardsPunishment)
        // const offeredCourses = await myscse.getOfferedCourses(context)
        // log(offeredCourses)
        // const illegalInfo = await myscse.getIllegalInfo(context)
        // log(illegalInfo)
}

main()