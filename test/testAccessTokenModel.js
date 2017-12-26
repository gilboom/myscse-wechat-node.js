const AccessToken = require('../model/accessTokenModel')

// const token = new AccessToken({
//         access_token:'Hello',
//         createTime:new Date()
// })

async function main() {
        // await token.save()
        //         .then(()=> {
        //                 console.log(token)
        //         })
        //         .catch((err)=>{
        //                 return err
        //         })
        const access_token = await AccessToken.getAccessToken()
        console.log(access_token)
}

main()