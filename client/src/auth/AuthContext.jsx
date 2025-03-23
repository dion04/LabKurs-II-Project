import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)

      // Fetch user info if we have a token
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            'http://localhost:8080/api/users/me',
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          )
          setUser(response.data)
        } catch (error) {
          console.error('Failed to fetch user:', error)
          logout()
        } finally {
          setLoading(false)
        }
      }

      fetchUser()
    } else {
      localStorage.removeItem('token')
      setUser(null)
      setLoading(false)
    }
  }, [token])

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password
      })
      setToken(response.data.token)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed'
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/register',
        userData
      )
      setToken(response.data.token)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed'
      }
    }
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
    setUser(null)
  }

  const value = {
    token,
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
