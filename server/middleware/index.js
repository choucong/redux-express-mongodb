import jwt from 'jsonwebtoken'
import config from '../config'

export function middleware (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, config.secret, function (err, decode) {
      if (err) return res.boom.unauthorized('Failed to authentication')
      req.decode = decode
      next()
    })
  } else {
    return res.boom.unauthorized('Missing authentication')
  }
}
