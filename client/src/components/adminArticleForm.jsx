import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const AdminArticleForm = forwardRef(({ onArticleCreate, initialData = null, onFormChange }, ref) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [initialFormData, setInitialFormData] = useState(null);

  const resetForm = () => {
    setFormData({ title: '', content: '', imageUrl: '' });
    setInitialFormData({ title: '', content: '', imageUrl: '' });
    onFormChange?.(false);
    setError(null);
    setSuccess(false);
  };

  useImperativeHandle(ref, () => ({
    resetForm
  }));

  useEffect(() => {
    if (initialData) {
      const newFormData = {
        title: initialData.title || '',
        content: initialData.content || '',
        imageUrl: initialData.imageUrl || ''
      };
      setFormData(newFormData);
      setInitialFormData(newFormData);
    } else {
      resetForm();
    }
  }, [initialData]);

  useEffect(() => {
    if (initialFormData) {
      const hasChanges = Object.keys(formData).some(
        key => formData[key] !== initialFormData[key]
      );
      onFormChange?.(hasChanges);
    }
  }, [formData, initialFormData, onFormChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const url = initialData
        ? `http://localhost:8080/api/articles/${initialData.id}`
        : 'http://localhost:8080/api/articles';

      const method = initialData ? 'put' : 'post';
      
      // Create the article data
      const articleData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        imageUrl: formData.imageUrl?.trim() || undefined
      };

      console.log('Sending article data:', articleData);

      const response = await axios({
        method: method,
        url: url,
        data: articleData,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Response:', response.data);
      onArticleCreate(response.data);
      
      if (!initialData) {
        resetForm();
      } else {
        setInitialFormData(formData);
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error submitting article:', err.response || err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message;
      setError(`Failed to submit article: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-base-200 rounded-xl p-6">
      <h3>{initialData ? 'Edit Article' : 'Create New Article'}</h3>

      {error && (
        <div className="mb-4 p-4 rounded-lg bg-error/10 border border-error text-error">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-4 rounded-lg bg-success/10 border border-success text-success">
          {initialData ? 'Article updated!' : 'Article created successfully!'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title <span className="text-error">*</span>
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="input input-bordered w-full"
            placeholder="Enter article title"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Content <span className="text-error">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            rows={6}
            className="textarea textarea-bordered w-full min-h-[200px]"
            placeholder="Write your article content here..."
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">
            Image URL
          </label>
          <input
            id="imageUrl"
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            disabled={isSubmitting}
            className="input input-bordered w-full"
            placeholder="https://example.com/image.jpg"
          />
          {formData.imageUrl && (
            <div className="mt-2 rounded-lg overflow-hidden border border-base-300">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                }}
              />
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`btn btn-primary w-full ${isSubmitting ? 'loading' : ''}`}
        >
          {isSubmitting 
            ? (initialData ? 'Saving...' : 'Publishing...') 
            : (initialData ? 'Save Changes' : 'Publish Article')}
        </button>
      </form>
    </div>
  );
});

export default AdminArticleForm;
