import { Schema } from 'mongoose'
import database from '../config/db'
import bcrypt from 'bcrypt'

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', function (next) {
  var user = this
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

export default database.model('User', UserSchema)
