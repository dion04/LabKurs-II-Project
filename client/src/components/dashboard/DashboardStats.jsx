function DashboardStats({ user }) {
  return (
    <div className='stats shadow w-full mb-8'>
      <div className='stat'>
        <div className='stat-figure text-primary'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block w-8 h-8 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
            ></path>
          </svg>
        </div>
        <div className='stat-title'>Total Articles</div>
        <div className='stat-value text-primary'>0</div>
        <div className='stat-desc'>Start writing today</div>
      </div>

      <div className='stat'>
        <div className='stat-figure text-secondary'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block w-8 h-8 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 10V3L4 14h7v7l9-11h-7z'
            ></path>
          </svg>
        </div>
        <div className='stat-title'>Total Views</div>
        <div className='stat-value text-secondary'>0</div>
        <div className='stat-desc'>Grow your audience</div>
      </div>

      <div className='stat'>
        <div className='stat-figure text-secondary'>
          <div className='avatar'>
            <div className='w-16 rounded-full'>
              <img
                src={
                  user.profileImageUrl
                    ? user.profileImageUrl
                    : 'https://ui-avatars.com/api/?name=John+Doe&background=random'
                }
              />
            </div>
          </div>
        </div>
        <div className='stat-value'>0%</div>
        <div className='stat-title'>Engagement Rate</div>
        <div className='stat-desc text-secondary'>Engage with readers</div>
      </div>
    </div>
  )
}

export default DashboardStats
