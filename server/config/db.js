import mongoose from 'mongoose'

const host = 'localhost'
const database = 'mbiz-node-redux'
const port = 27017

var connection = mongoose.createConnection(host, database, port)
connection.on('error', function (error) {
  console.log(error)
})

export default connection
