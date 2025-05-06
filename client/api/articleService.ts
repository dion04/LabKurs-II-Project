import { apiClient } from './apiClient'
import type {
  Article,
  ArticleResponse,
  ArticlesResponse,
  CreateArticleRequest,
  UpdateArticleRequest
} from '@/interfaces/article'

export const articleService = {
  // Get all articles with pagination
  getArticles: async (page = 1, limit = 10): Promise<ArticlesResponse> => {
    const response = await apiClient.get(
      `/articles?page=${page}&limit=${limit}`
    )
    return response.data
  },

  // Get a single article by ID
  getArticleById: async (id: number): Promise<ArticleResponse> => {
    const response = await apiClient.get(`/articles/${id}`)
    return response.data
  },

  // Create a new article
  createArticle: async (
    article: CreateArticleRequest
  ): Promise<ArticleResponse> => {
    const response = await apiClient.post('/articles', article)
    return response.data
  },

  // Update an existing article
  updateArticle: async (
    id: number,
    article: UpdateArticleRequest
  ): Promise<ArticleResponse> => {
    const response = await apiClient.put(`/articles/${id}`, article)
    return response.data
  },

  // Delete an article
  deleteArticle: async (id: number): Promise<void> => {
    await apiClient.delete(`/articles/${id}`)
  }
}
