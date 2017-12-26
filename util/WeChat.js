const request = require('request-promise-native')
const log = console.log.bind(console)
const WeChat = {
        config: {
                APPID:'wxceed517fafc83bf0',
                APPSECRET:'35b1fdd98163bb6bdc8ad3f82688576b',
                token:'chibaowei',
                msgTypeList:[
                        'text','image','voice','video','shortvideo','location','link','event',
                ]
        }
}

WeChat.config.initMenu = (async function() {
        const access_token = await this.getAccessToken()
        const options = {
                method: 'POST',
                uri: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token='+access_token,
                body:{
                        'button':[
                                {
                                        type:'click',
                                        name:'帐号绑定',
                                        key:'account_bind'
                                },
                                {
                                        name:'信息查询1',
                                        sub_button:[
                                                {
                                                        type:'click',
                                                        name:'个人信息',
                                                        key:'student_info'
                                                },
                                                {
                                                        type:'click',
                                                        name:'课程表',
                                                        key:'classes'
                                                },
                                                {
                                                        type:'click',
                                                        name:'考试时间',
                                                        key:'examination_time',
                                                },
                                                {
                                                        type:'click',
                                                        name:'考勤',
                                                        key:'attendance'
                                                },
                                                {
                                                        type:'click',
                                                        name:'成绩',
                                                        key:'grade'
                                                }
                                        ]
                                },
                        ]
                },
                json:true,
                encoding: null,
                transform(body) {
                        return body
                }
        }
        try{
                const body = await request(options)
                log('body',body.errcode,body.errmsg)
        }catch(e) {
                return e
        }
}).bind(WeChat)

WeChat.getAccessToken = (async function() {
        const options = {
                method: 'GET',
                uri: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+this.config.APPID+'&secret='+this.config.APPSECRET,
                encoding: null,
                transform(body) {
                        return JSON.parse(body.toString())
                }
        }
        try{
                const body = await request(options)
                const access_token = body.access_token
                log(access_token)
                return access_token                        
        }catch(e) {
                return e
        }
}).bind(WeChat)

exports = module.exports = WeChat