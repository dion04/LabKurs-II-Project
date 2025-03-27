import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
    }
    setLoading(false)
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  const login = async (email, password) => {
    try {
      setLoading(true)
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        {
          email,
          password
        }
      )
      setToken(response.data.token)
      setUser(response.data.data.user)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed'
      }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      const isFormData = userData instanceof FormData

      const headers = isFormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' }

      const response = await axios.post(
        'http://localhost:8080/api/auth/register',
        userData,
        { headers }
      )

      setToken(response.data.token)
      setUser(response.data.data.user)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed'
      }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (userData) => {
    try {
      const isFormData = userData instanceof FormData

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
      }

      const response = await axios.patch(
        'http://localhost:8080/api/users/profile',
        userData,
        { headers }
      )

      setUser(response.data.data.user)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Profile update failed'
      }
    }
  }

  const logout = () => {
    setToken(null)
  }

  const value = {
    token,
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
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
