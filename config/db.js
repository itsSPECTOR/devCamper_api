const mongoose = require('mongoose')

// we imported the uri (database url thing) as an inviroment variable.
// so its globally accessable via process.env.... and the var is assigned
// to MONGO_URI

//connect to the db
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {})
  console.log(`Mongo db connected: ${conn.connection.host}`.cyan.underline.bold)
}

// exports this code so we can connect to the db via server.js
module.exports = connectDB