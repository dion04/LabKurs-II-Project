import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useAuth } from '../auth/AuthContext'
import axios from 'axios'
import { redirect } from '@tanstack/react-router'
import DashboardStats from '../components/dashboard/DashboardStats'
import DashboardTabs from '../components/dashboard/DashboardTabs'
import UserList from '../components/dashboard/UserList'

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
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setUsers(response.data.data.users)
      } catch (err) {
        setError('Failed to fetch users')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (activeTab === 'users') {
      fetchUsers()
    } else {
      setLoading(false)
    }
  }, [activeTab])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-96'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    )
  }

  return (
    <div className='container mx-auto p-4'>
      {/* Dashboard Header */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          <p className='text-base-content/70'>
            Welcome back, {user?.firstName}!
          </p>
        </div>
        <div className='mt-4 md:mt-0'>
          <button className='btn btn-primary'>Create New Article</button>
        </div>
      </div>

      <DashboardStats user={user} />
      <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      <div className='bg-base-100 p-6 rounded-box shadow-lg'>
        {activeTab === 'overview' && (
          <div>
            <div className='flex flex-col md:flex-row gap-8'>
              <div className='flex-1'>
                <h3 className='text-xl font-bold mb-4'>Recent Activity</h3>
                <div className='alert'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    className='stroke-info shrink-0 w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                  <span>
                    No recent activity. Start by creating your first article!
                  </span>
                </div>
              </div>

              <div className='w-full md:w-80'>
                <h3 className='text-xl font-bold mb-4'>Notifications</h3>
                <div className='alert'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    className='stroke-info shrink-0 w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                  <span>No new notifications.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-xl font-bold'>My Articles</h3>
              <div className='join'>
                <button className='join-item btn btn-sm'>All</button>
                <button className='join-item btn btn-sm'>Published</button>
                <button className='join-item btn btn-sm'>Drafts</button>
              </div>
            </div>

            <div className='alert'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='stroke-info shrink-0 w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
              <span>
                No articles yet. Click "Create New Article" to get started!
              </span>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h3 className='text-xl font-bold mb-6'>All Users</h3>
            <UserList users={users} error={error} />
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h3 className='text-xl font-bold mb-6'>Account Settings</h3>

            <div className='card bg-base-200 mb-6'>
              <div className='card-body'>
                <h4 className='card-title text-lg'>Profile Information</h4>
                <form className='mt-4 space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='form-control'>
                      <label className='label'>
                        <span className='label-text'>First Name</span>
                      </label>
                      <input
                        type='text'
                        className='input input-bordered'
                        defaultValue={user?.firstName || ''}
                      />
                    </div>
                    <div className='form-control'>
                      <label className='label'>
                        <span className='label-text'>Last Name</span>
                      </label>
                      <input
                        type='text'
                        className='input input-bordered'
                        defaultValue={user?.lastName || ''}
                      />
                    </div>
                  </div>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Email</span>
                    </label>
                    <input
                      type='email'
                      className='input input-bordered'
                      defaultValue={user?.email || ''}
                      readOnly
                    />
                  </div>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Bio</span>
                    </label>
                    <textarea className='textarea textarea-bordered h-24'></textarea>
                  </div>
                  <div className='form-control mt-6'>
                    <button className='btn btn-primary'>Save Changes</button>
                  </div>
                </form>
              </div>
            </div>

            <div className='card bg-base-200'>
              <div className='card-body'>
                <h4 className='card-title text-lg'>Security</h4>
                <form className='mt-4 space-y-4'>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Current Password</span>
                    </label>
                    <input type='password' className='input input-bordered' />
                  </div>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>New Password</span>
                    </label>
                    <input type='password' className='input input-bordered' />
                  </div>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Confirm New Password</span>
                    </label>
                    <input type='password' className='input input-bordered' />
                  </div>
                  <div className='form-control mt-6'>
                    <button className='btn btn-primary'>Change Password</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
