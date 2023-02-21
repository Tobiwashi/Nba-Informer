const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const teamSchema = require('./models/teamSchema')
const allPlayers = require('./models/roster')
const { db } = require('./models/teamSchema')
const app = express()
require('dotenv').config()

//Port
const PORT = process.env.PORT || '8080';

// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo & Fix Depreciation Warnings from Mongoose //
mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI);

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('Mongo Connection Established: ', MONGODB_URI));
db.on('disconnected', () => console.log('Mongo Connection Terminated'));

const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'express');
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}));

//Routes//
app.get('/', (req, res) =>{
    teamSchema.find({},(err, allPlayers) =>{
        res.render('index.ejs', {allPlayers})
    })

app.get('/add', (req,res)=>{
        res.render('add.ejs')
    }) 

    app.post('/add', (req, res)=>{
        teamSchema.create(req.body, (error, createdTeam)=>{
            res.redirect('/');
        });
    });
app.get('/:id', (req,res) =>{
    teamSchema.findById(req.params.id, (err,player)=>{
            res.render('show.ejs',{player})
        })
    })
}) 

app.get('/edit/:id', (req,res) =>{
    teamSchema.findById(req.params.id, (err,player)=>{
        res.render('edit.ejs',{player})
    })
})

app.put('/edit/:id' , (req,res)=>{
    teamSchema.findByIdAndUpdate(req.params.id, req.body, {new:true},(err,player)=>{
        res.redirect('/')
    })
})
app.delete('/delete/:id' ,(req,res) =>{
    teamSchema.findByIdAndRemove(req.params.id, (err,player)=>{
        res.redirect('/')
    })
})
app.listen(PORT, () => console.log( 'Listening on port:', PORT));

// // Collection Creation//
// teamSchema.create(allPlayers, (err, items)=> {
//     console.log(items)
// })  