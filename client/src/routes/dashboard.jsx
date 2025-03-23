import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useAuth } from '../auth/AuthContext'
import axios from 'axios'
import { protectRoute } from '../utils/index.utils'
import { redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ location }) => {
    const token = localStorage.getItem('token')
    if (!token) {
      throw redirect({
        to: '/login',
        search: {
          redirectTo: location.href
        }
      })
    }
  },
  component: Dashboard
})

function Dashboard() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setUsers(response.data.data)
      } catch (err) {
        setError('Failed to fetch users')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>

      {user && (
        <div className='mb-6 p-4 bg-blue-50 rounded-lg'>
          <h2 className='text-xl font-semibold mb-2'>
            Welcome, {user.firstName}!
          </h2>
          <p>Your email: {user.email}</p>
        </div>
      )}

      {error && (
        <div className='mb-4 p-2 bg-red-100 text-red-700 rounded'>{error}</div>
      )}

      <div>
        <h2 className='text-xl font-semibold mb-4'>All Users</h2>
        {users.length > 0 ? (
          <ul className='divide-y divide-gray-200'>
            {users.map((user) => (
              <li key={user.id} className='py-3'>
                <div className='flex items-center space-x-4'>
                  <div className='flex-1 min-w-0'>
                    <p className='font-medium'>
                      {user.firstName} {user.lastName}
                    </p>
                    <p className='text-gray-500 truncate'>{user.email}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  )
}
