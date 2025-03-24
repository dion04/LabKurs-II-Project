function CategoryBrowser() {
  return (
    <div className='mt-16'>
      <h2 className='text-3xl font-bold mb-6'>Browse by Category</h2>
      <div className='flex flex-wrap gap-4 justify-center'>
        {[
          'Politics',
          'Technology',
          'Health',
          'Science',
          'Entertainment',
          'Sports',
          'Business',
          'Education'
        ].map((category) => (
          <div key={category} className='badge badge-lg p-4 badge-outline'>
            {category}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryBrowser
