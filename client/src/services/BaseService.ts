import { AxiosInstance } from 'axios'
import client from '../utils/axios.utils'

class BaseService {
  protected client: AxiosInstance

  constructor() {
    this.client = client
  }
}

export default BaseService
