const db = require('../models')
const { AppError } = require('../middlewares/errorMiddleware')

exports.findById = async (id) => {
  const user = await db.User.findByPk(id, {
    attributes: ['id', 'firstName', 'lastName', 'email', 'role']
  })

  if (!user) {
    throw new AppError('User not found', 404)
  }

  return user
}

exports.findByEmail = async (email) => {
  return await db.User.findOne({ where: { email } })
}

exports.create = async (userData) => {
  return await db.User.create(userData)
}

exports.findAll = async () => {
  return await db.User.findAll({
    attributes: [
      'id',
      'firstName',
      'lastName',
      'email',
      'role',
      'profileImageUrl'
    ]
  })
}

exports.update = async (id, data) => {
  const user = await this.findById(id)
  return await user.update(data)
}

exports.delete = async (id) => {
  const user = await this.findById(id)
  await user.destroy()
  return { id }
}
