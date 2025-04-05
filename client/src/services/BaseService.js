import client from '../utils/axios.utils'

class BaseService {
  client

  constructor() {
    this.client = client
  }
}

export default BaseService
