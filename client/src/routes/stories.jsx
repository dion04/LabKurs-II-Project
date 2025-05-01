import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import axios from 'axios'

export const Route = createFileRoute('/stories')({
  component: Stories,
})

function Stories() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log('Fetching articles...');
        const response = await axios.get('http://localhost:8080/api/articles', {
          headers: {
            'Accept': 'application/json'
          }
        });

        let articlesData = response.data;
        if (!Array.isArray(articlesData)) {
          console.log('Response is not an array, setting empty array');
          setArticles([]);
          return;
        }

        setArticles(articlesData);
      } catch (err) {
        console.error('Error in fetchArticles:', err);
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  if (loading) return <div className="flex justify-center p-8">Loading...</div>
  if (error) return <div className="text-error p-8">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Stories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article key={article.id} className="card bg-base-100 shadow-xl">
            {article.imageUrl && (
              <figure>
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title">{article.title}</h2>
              <p className="line-clamp-3">{article.content}</p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary">Read More</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {articles.length === 0 && (
        <div className="text-center py-8">
          <p className="text-lg">No stories available yet.</p>
        </div>
      )}
    </div>
  )
}