import axios from 'axios'

// Create a variable to store the token getter function
let getTokenFunction: (() => Promise<string | null>) | null = null

// Function to set the token getter from components
export const setTokenGetter = (getter: () => Promise<string | null>) => {
  getTokenFunction = getter
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
})

apiClient.interceptors.request.use(async (config) => {
  console.log('Request interceptor triggered')

  // Use the token getter function instead of direct hook
  if (getTokenFunction) {
    try {
      const token = await getTokenFunction()
      console.log(token)
      if (token) {
        console.log('Token obtained successfully')
        config.headers['Authorization'] = `Bearer ${token}`
      } else {
        console.log('No token available')
      }
    } catch (error) {
      console.error('Error getting auth token:', error)
    }
  } else {
    console.log('Token getter function not set')
  }

  return config
})
