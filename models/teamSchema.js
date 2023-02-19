//Dependencies//
const mongoose = require('mongoose')

//Schema//
const teamSchema = new mongoose.Schema({
    name: String,
    formation: Number,
    championships: Number,
    image: String,
    highlights: String,
    stadium: String,
})

//Product Collection Creator//
const teamCollection =mongoose.model('Team', teamSchema)
module.exports= teamCollection