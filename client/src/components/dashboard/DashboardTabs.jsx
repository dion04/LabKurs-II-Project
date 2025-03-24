function DashboardTabs({ activeTab, setActiveTab }) {
  return (
    <div className='tabs tabs-boxed mb-6'>
      <a
        className={`tab ${activeTab === 'overview' ? 'tab-active' : ''}`}
        onClick={() => setActiveTab('overview')}
      >
        Overview
      </a>
      <a
        className={`tab ${activeTab === 'articles' ? 'tab-active' : ''}`}
        onClick={() => setActiveTab('articles')}
      >
        My Articles
      </a>
      <a
        className={`tab ${activeTab === 'users' ? 'tab-active' : ''}`}
        onClick={() => setActiveTab('users')}
      >
        Users
      </a>
      <a
        className={`tab ${activeTab === 'settings' ? 'tab-active' : ''}`}
        onClick={() => setActiveTab('settings')}
      >
        Settings
      </a>
    </div>
  )
}

export default DashboardTabs
