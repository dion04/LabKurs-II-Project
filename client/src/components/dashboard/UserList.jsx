function UserList({ users, error }) {
  if (!users.length) {
    return <p className='text-center py-4'>No users found.</p>
  }

  return (
    <>
      {error && (
        <div className='alert alert-error mb-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current shrink-0 h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className='flex items-center gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle w-10 h-10'>
                        <img
                          src={
                            user.profileImageUrl
                              ? user.profileImageUrl
                              : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`
                          }
                          alt={`${user.firstName} ${user.lastName}`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className='font-bold'>{`${user.firstName} ${user.lastName}`}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <div
                    className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-secondary'}`}
                  >
                    {user.role}
                  </div>
                </td>
                <td>
                  <button className='btn btn-ghost btn-xs'>View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default UserList
