import { useState, useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import AdminArticleForm from '../components/adminArticleForm';

export const Route = createFileRoute('/adminpage')({
  component: AdminPage,
})

// AdminPage component
function AdminPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const formRef = useRef(null);

  // Fetch all articles on mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log('Fetching articles for admin page...');
        const response = await axios({
          method: 'get',
          url: 'http://localhost:8080/api/articles',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        console.log('Articles response:', response.data);
        let articlesData = response.data;
        
        if (!Array.isArray(articlesData)) {
          console.log('Response is not an array, setting empty array');
          setArticles([]);
          return;
        }

        setArticles(articlesData);
      } catch (err) {
        console.error('Error fetching articles:', err.response || err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // Handle new article creation
  const handleNewArticle = (newArticle) => {
    setArticles(prev => [newArticle, ...prev]);
  };

  // Handle article update
  const handleEditSuccess = (updatedArticle) => {
    setArticles(prev =>
      prev.map(article => article.id === updatedArticle.id ? updatedArticle : article)
    );
    setEditingArticle(null); // Exit edit mode
  };

  // Handle article deletion
  const handleDelete = async (id) => {
    try {
      await axios({
        method: 'delete',
        url: `http://localhost:8080/api/articles/${id}`,
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      setArticles(prev => prev.filter(article => article.id !== id));
    } catch (err) {
      console.error('Error deleting article:', err.response || err);
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleFormVisibilityToggle = () => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
      setPendingAction('toggle');
    } else {
      setIsFormVisible(prev => !prev);
      setEditingArticle(null);
      formRef.current?.resetForm();
      setHasUnsavedChanges(false);
    }
  };

  const handleCreateNewClick = () => {
    if (hasUnsavedChanges && editingArticle) {
      setShowConfirmDialog(true);
      setPendingAction('create');
    } else {
      setEditingArticle(null);
      setIsFormVisible(true);
      formRef.current?.resetForm();
      setHasUnsavedChanges(false);
    }
  };

  const handleEditClick = (article) => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
      setPendingAction({ type: 'edit', article });
    } else {
      setEditingArticle(article);
      setIsFormVisible(true);
      document.querySelector('.form-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConfirmAction = () => {
    setHasUnsavedChanges(false);
    setShowConfirmDialog(false);
    
    if (pendingAction?.type === 'edit') {
      setEditingArticle(pendingAction.article);
      setIsFormVisible(true);
      setTimeout(() => {
        document.querySelector('.form-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (pendingAction === 'toggle') {
      setIsFormVisible(prev => !prev);
      setEditingArticle(null);
      formRef.current?.resetForm();
    } else if (pendingAction === 'create') {
      setEditingArticle(null);
      setIsFormVisible(true);
      formRef.current?.resetForm();
    }
    
    setPendingAction(null);
  };

  const handleCancelAction = () => {
    setShowConfirmDialog(false);
    setPendingAction(null);
  };

  const handleDeleteClick = (article) => {
    setArticleToDelete(article);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await handleDelete(articleToDelete.id);
      setShowDeleteDialog(false);
      setArticleToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setArticleToDelete(null);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen p-8">
      <div className="bg-error/10 border border-error text-error rounded-lg p-4">
        {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-base-content">Article Management</h1>
            <button 
              onClick={handleFormVisibilityToggle}
              className="btn btn-primary"
            >
              {isFormVisible ? 'Cancel' : 'Create New Article'}
            </button>
          </div>
          <p className="text-base-content/70 mt-2">Create, edit, and manage your news articles</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr,2fr]">
          {/* Article Creation/Edit Form */}
          <div className="form-section">
            <div className={`transition-all duration-300 ease-in-out ${
              isFormVisible 
                ? 'opacity-100 translate-y-0 h-auto' 
                : 'opacity-0 -translate-y-4 h-0 overflow-hidden'
            }`}>
              <div className="bg-base-200/50 backdrop-blur rounded-2xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-primary">
                    {editingArticle ? 'Edit Article' : 'Create New Article'}
                  </h2>
                  {editingArticle && (
                    <button 
                      onClick={handleCreateNewClick}
                      className="btn btn-ghost btn-sm"
                    >
                      Create New Instead
                    </button>
                  )}
                </div>
                <AdminArticleForm
                  ref={formRef}
                  onArticleCreate={editingArticle ? handleEditSuccess : handleNewArticle}
                  initialData={editingArticle}
                  onFormChange={(hasChanges) => setHasUnsavedChanges(hasChanges)}
                />
                {editingArticle && (
                  <button 
                    onClick={() => {
                      setEditingArticle(null);
                      formRef.current?.resetForm();
                    }} 
                    className="btn btn-ghost mt-4 w-full"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Articles List */}
          <div>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
              Articles List
              <span className="text-sm font-normal text-base-content/70">
                ({articles.length} {articles.length === 1 ? 'article' : 'articles'})
              </span>
            </h2>

            <div className="space-y-4">
              {articles && articles.length > 0 ? (
                articles.map(article => (
                  <div 
                    key={article.id} 
                    className="bg-base-200/50 backdrop-blur rounded-xl p-4 shadow-md hover:shadow-lg transition-all group"
                  >
                    <div className="flex gap-4">
                      {article.imageUrl && (
                        <div className="flex-shrink-0">
                          <img 
                            src={article.imageUrl} 
                            alt={article.title}
                            className="w-24 h-24 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-lg truncate">{article.title}</h3>
                        <p className="text-base-content/70 text-sm line-clamp-2 mt-1">
                          {article.content}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs text-base-content/60">
                            {new Date(article.createdAt).toLocaleDateString()}
                          </span>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEditClick(article)}
                              className="btn btn-xs btn-primary"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteClick(article)}
                              className="btn btn-xs btn-error"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-base-200/50 backdrop-blur rounded-xl">
                  <svg 
                    className="mx-auto h-12 w-12 text-base-content/30" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium">No articles yet</h3>
                  <p className="mt-1 text-base-content/70">Create your first article using the form!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && articleToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Delete Article</h3>
            <div className="mb-6">
              <p className="text-base-content/70 mb-4">
                Are you sure you want to delete this article?
              </p>
              <div className="bg-base-200/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">{articleToDelete.title}</h4>
                <p className="text-sm text-base-content/70 line-clamp-3">
                  {articleToDelete.content}
                </p>
                {articleToDelete.imageUrl && (
                  <img 
                    src={articleToDelete.imageUrl}
                    alt={articleToDelete.title}
                    className="mt-2 w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button 
                onClick={handleCancelDelete}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDelete}
                className="btn btn-error"
              >
                Yes, Delete Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unsaved Changes Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Unsaved Changes</h3>
            <p className="text-base-content/70 mb-6">
              You have unsaved changes. Are you sure you want to continue? Your changes will be lost.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={handleCancelAction}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmAction}
                className="btn btn-error"
              >
                Yes, Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// CSS Styles (can be moved to separate file)
const styles = `
  .admin-page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .admin-header {
    margin-bottom: 2rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
  }

  .loading-spinner {
    display: flex;
    justify-content: center;
    padding: 2rem;
  }

  .error-alert {
    color: #dc3545;
    background: #f8d7da;
    padding: 1rem;
    border-radius: 4px;
    margin: 1rem 0;
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .article-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    transition: transform 0.2s;
  }

  .article-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  .article-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }

  .delete-button {
    background: #dc3545;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .delete-button:hover {
    background: #c82333;
  }
`;

// Inject styles
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);
