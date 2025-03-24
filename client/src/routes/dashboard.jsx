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
  const { user, updateProfile } = useAuth()
  console.log(user)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  // Profile update states
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    bio: user?.bio || ''
  })
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Password change states
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false)

  // Update user state when it becomes available
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: user.bio || ''
      })
    }
  }, [user])

  // Handle profile form input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle profile image change
  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProfileImage(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle profile update submission
  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let updateData

      if (profileImage) {
        // Create FormData for file upload
        updateData = new FormData()
        updateData.append('file', profileImage)

        // Add other form fields
        Object.entries(profileData).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            updateData.append(key, value)
          }
        })
      } else {
        updateData = { ...profileData }
      }

      const result = await updateProfile(updateData)

      if (result.success) {
        // Show success message
        alert('Profile updated successfully')
        // Reset image state since it's been uploaded
        setProfileImage(null)
      } else {
        alert(result.error || 'Failed to update profile')
      }
    } catch (err) {
      console.error('Profile update error:', err)
      alert('An error occurred while updating your profile')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle password form input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle password update submission
  const handlePasswordUpdate = async (e) => {
    e.preventDefault()

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match")
      return
    }

    setIsPasswordUpdating(true)

    try {
      // Use axios directly or add a method to AuthContext
      const response = await axios.patch(
        'http://localhost:8080/api/users/password',
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      if (response.data.success) {
        alert('Password updated successfully')
        // Clear password fields
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update password')
    } finally {
      setIsPasswordUpdating(false)
    }
  }

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
                <form className='mt-4 space-y-4' onSubmit={handleProfileUpdate}>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Profile Image</span>
                    </label>
                    <div className='flex items-center space-x-4'>
                      <div className='avatar'>
                        <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                          <img
                            src={
                              imagePreview ||
                              user?.profileImageUrl ||
                              `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`
                            }
                            alt='Profile'
                          />
                        </div>
                      </div>
                      <input
                        type='file'
                        onChange={handleProfileImageChange}
                        className='file-input file-input-bordered w-full max-w-xs'
                        accept='image/*'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='form-control'>
                      <label className='label'>
                        <span className='label-text'>First Name</span>
                      </label>
                      <input
                        type='text'
                        name='firstName'
                        className='input input-bordered'
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className='form-control'>
                      <label className='label'>
                        <span className='label-text'>Last Name</span>
                      </label>
                      <input
                        type='text'
                        name='lastName'
                        className='input input-bordered'
                        value={profileData.lastName}
                        onChange={handleProfileChange}
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
                      value={user?.email || ''}
                      readOnly
                    />
                  </div>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Bio</span>
                    </label>
                    <textarea
                      className='textarea textarea-bordered h-24'
                      name='bio'
                      value={profileData.bio || ''}
                      onChange={handleProfileChange}
                    ></textarea>
                  </div>
                  <div className='form-control mt-6'>
                    <button className='btn btn-primary' disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className='loading loading-spinner loading-sm'></span>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className='card bg-base-200'>
              <div className='card-body'>
                <h4 className='card-title text-lg'>Security</h4>
                <form
                  className='mt-4 space-y-4'
                  onSubmit={handlePasswordUpdate}
                >
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Current Password</span>
                    </label>
                    <input
                      type='password'
                      className='input input-bordered'
                      name='currentPassword'
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>New Password</span>
                    </label>
                    <input
                      type='password'
                      className='input input-bordered'
                      name='newPassword'
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Confirm New Password</span>
                    </label>
                    <input
                      type='password'
                      className='input input-bordered'
                      name='confirmPassword'
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className='form-control mt-6'>
                    <button
                      className='btn btn-primary'
                      disabled={isPasswordUpdating}
                    >
                      {isPasswordUpdating ? (
                        <span className='loading loading-spinner loading-sm'></span>
                      ) : (
                        'Change Password'
                      )}
                    </button>
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
