import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' }
})

client.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('token')
    if (user) {
      config.headers.Authorization = `Bearer ${user}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

client.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

export default client
