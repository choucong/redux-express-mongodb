import User from '../models/users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'

export function signIn (req, res) {
  req.checkBody('username', 'username is required').notEmpty()
  req.checkBody('password', 'password is required').notEmpty()

  var errors = req.validationErrors()
  if (errors) return res.boom.preconditionFailed(errors)

  var { username, password } = req.body
  User.findOne({'username': username}).exec(function (err, result) {
    // if query error
    if (err) return res.boom.preconditionFailed(err)

    // if username not exist
    if (!result) return res.boom.unauthorized('Incorrect username or password')

    // compare password, if match do create token
    bcrypt.compare(password, result.password, function (err, isValid) {
      if (err) return res.boom.unauthorized('Incorrect username or password!!')
      if (isValid) {
        result = result.toJSON()
        delete result.password
        var token = jwt.sign(result, config.secret, {expiresIn: '1d'})
        res.send({
          statusCode: 200,
          token: token,
          data: result
        })
      } else {
        return res.boom.unauthorized('Incorrect username or password')
      }
    })
  })
}

export function checkToken (req, res) {
  res.send({
    statusCode: 200,
    user: req.decode
  })
}
