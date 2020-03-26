const express = require('express');   
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const login = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : process.env.DATABASE_URL,       //this ip is localhost (127.0.0.1)
      ssl: true
      // user : 'postgres',
      // password : 'postgres@1',
      // database : 'face_detect'
    }
  });


const app = express()
app.use(express.json());
app.use(cors())



app.get('/', (req, res)=> {res.send(db.users)})
app.post('/signin' , (req, res) => {login.handleSignIn(req, res, db ,bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req ,res) => {profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
    console.log('app is running on port {process.env.PORT}')
})




/*
project outline and routings

/ --> res = working (root)
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT = update user object

*/