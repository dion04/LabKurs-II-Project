function Card({ article }) {
  // Helper function to get author image
  const getAuthorImage = () => {
    if (article.authorImage) {
      return article.authorImage
    }
    return `https://ui-avatars.com/api/?name=${article.author}&background=random`
  }

  return (
    <div className='card bg-base-100 shadow-xl'>
      <figure>
        <img src={article.image} alt={article.title} />
      </figure>
      <div className='card-body'>
        <div className='badge badge-secondary mb-2'>{article.category}</div>
        <h2 className='card-title'>{article.title}</h2>
        <p>{article.snippet}</p>
        <div className='flex items-center mt-4'>
          <div className='avatar'>
            <div className='w-8 rounded-full'>
              <img src={getAuthorImage()} alt={article.author} />
            </div>
          </div>
          <div className='ml-2'>
            <p className='text-sm font-medium'>{article.author}</p>
            <p className='text-xs opacity-70'>{article.date}</p>
          </div>
        </div>
        <div className='card-actions justify-end mt-4'>
          <button className='btn btn-primary btn-sm'>Read More</button>
        </div>
      </div>
    </div>
  )
}

export default Card
