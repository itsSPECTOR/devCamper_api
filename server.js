const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

const bootCamps = require('./routes/bootCamps')   // route Files, we're importing the routes
dotenv.config({ path: './config/config.env'})     // load env vars
connectDB()                                       // connects to our mongoDB via db.js
const PORT = process.env.PORT || 5000             // set port
const app = express()                             // create app
app.use(express.json())                           // Body Parser for req json

// dev logger middleware
if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

// makes the routes accessable and shortens the need to wrie the full path
app.use('/api/v1/bootCamps', bootCamps)

// my custom error handler
app.use(errorHandler)

// listen
const server = app.listen(
  PORT, 
  console.log(`server running in ${process.env.NODE_ENV} mode on port 5000`.yellow.bold)
)

// handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold)
  //close server and exit
  server.close(()=> process.exit(1))
})