// filepath: server/services/userService.js
const userRepository = require('../repositories/userRepository')

exports.getProfile = async (userId) => {
  return await userRepository.findById(userId)
}

exports.getAllUsers = async () => {
  return await userRepository.findAll()
}

exports.updateUser = async (userId, data) => {
  return await userRepository.update(userId, data)
}

exports.deleteUser = async (userId) => {
  return await userRepository.delete(userId)
}
