const Mongoose = require('mongoose')
Mongoose.connect('mongodb://localhost/gilboom',{
        useMongoClient:true
})

exports = module.exports = Mongoose