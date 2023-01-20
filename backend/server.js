const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('../backend/middleware/ErrorMiddleware')
const connectDb = require('../backend/config/db')
const PORT = process.env.Port || 8000

//connect Db
connectDb()

const app = express()
// to get body as json and form
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`Server Started on Port ${PORT}`)
}

)