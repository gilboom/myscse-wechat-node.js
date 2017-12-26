const Mongoose = require('mongoose')
Mongoose.connect('mongodb://localhost/accessToken',{
        useMongoClient:true
})

exports = module.exports = Mongoose