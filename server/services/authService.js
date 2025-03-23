const bcrypt = require('bcryptjs')
const { AppError } = require('../middlewares/errorMiddleware')
const userRepository = require('../repositories/userRepository')
const { signToken } = require('../config/jwt')

exports.register = async (userData) => {
  const existingUser = await userRepository.findByEmail(userData.email)
  if (existingUser) {
    throw new AppError('Email already in use', 400)
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10)

  const user = await userRepository.create({
    ...userData,
    password: hashedPassword
  })

  const token = signToken({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  })

  return { user, token }
}

exports.login = async (email, password) => {
  const user = await userRepository.findByEmail(email)
  if (!user) {
    throw new AppError('Invalid email or password', 401)
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401)
  }

  const token = signToken({ id: user.id })

  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    },
    token
  }
}
