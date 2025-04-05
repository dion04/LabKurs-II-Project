import BaseService from './BaseService'

class AuthService extends BaseService {
  constructor() {
    super()
    this.client = this.client
  }

  async login(data) {
    return this.client.get('/auth/login', data)
  }

  async register(data) {
    const isFormData = data instanceof FormData

    const headers = isFormData
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': 'application/json' }

    return this.client.post('/auth/register', data, { headers })
  }

  async logout() {
    return this.client.post('/auth/logout')
  }
}

const authService = new AuthService()
export default authService
