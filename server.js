const express = require('express')
const dotenv = require('dotenv')

// load env var
dotenv.config({ path: './config/config.env'})

// set port
const PORT = process.env.PORT || 5000

const app = express()



app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV}mode on port 5000`))
