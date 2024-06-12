require('dotenv').config()

let PORT = process.env.PORT || 3003
let MONGODB_URI = process.env.MONGODB_URI
const mongoUrl = 'mongodb://localhost/bloglist'

module.exports = {
  mongoUrl,
  MONGODB_URI,
  PORT
}