const express = require('express')
const parser = require('body-parser')
require('body-parser-xml')(parser)
const crypto = require('crypto')
const WeChat = require('./util/WeChat')
const route = require('./route/route')
const token = WeChat.config.token
const initMenu = WeChat.config.initMenu
const log = console.log.bind(console)
const app = express()

app.use(parser.xml({
        xmlParseOptions:{
                explicitArray:false,
                explicitRoot:false
        }
}))

app.use(parser.json(),parser.urlencoded({extended:true}),parser.raw(),parser.text())

app.get('/wx',checkSignature)

app.post('/wx',logger,route)

app.listen(process.env.PORT|| 3000)

async function checkSignature(req,res) {
        const {signature,timestamp,nonce,echostr} = req.query
        const tempArray = [token,timestamp,nonce].sort()
        let tempString = sha1(tempArray.join(''))
        if(tempString === signature) {
                console.log("signature: %s, timestamp: %s, nonce: %s, echostr: %s, tempString: %s",signature,timestamp,nonce,echostr,tempString)
                res.send(echostr.toString())
                await doInit()
        }else {
                res.send('不匹配')
        }

        async function doInit() {
                return await initMenu()
        }
}

function logger (req,res,next){
        log('event message:',req.body,req.text,req.raw)
        next()
}

function sha1(str) {
        const hash = crypto.createHash('sha1')
        hash.update(str)
        str = hash.digest('hex')
        return str
}