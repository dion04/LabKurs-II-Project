const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRY = '24h'

module.exports = {
  JWT_SECRET,
  JWT_EXPIRY,
  signToken: (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY })
  },
  verifyToken: (token) => {
    return jwt.verify(token, JWT_SECRET)
  }
}
