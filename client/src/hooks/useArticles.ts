import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { articleService } from '@/../api/articleService'
import type {
  CreateArticleRequest,
  UpdateArticleRequest
} from '@/interfaces/article'

// Query key constants
export const ARTICLES_QUERY_KEY = 'articles'

// Hook to fetch all articles with pagination
export const useArticles = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: [ARTICLES_QUERY_KEY, page, limit],
    queryFn: () => articleService.getArticles(page, limit)
  })
}

// Hook to fetch a single article by ID
export const useArticle = (id: number) => {
  return useQuery({
    queryKey: [ARTICLES_QUERY_KEY, id],
    queryFn: () => articleService.getArticleById(id),
    enabled: !!id // Only run if ID is provided
  })
}

// Hook to create a new article
export const useCreateArticle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (article: CreateArticleRequest) =>
      articleService.createArticle(article),
    onSuccess: () => {
      // Invalidate articles query to refresh the list
      queryClient.invalidateQueries({ queryKey: [ARTICLES_QUERY_KEY] })
    }
  })
}

// Hook to update an article
export const useUpdateArticle = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (article: UpdateArticleRequest) =>
      articleService.updateArticle(id, article),
    onSuccess: () => {
      // Invalidate specific article and list queries
      queryClient.invalidateQueries({ queryKey: [ARTICLES_QUERY_KEY, id] })
      queryClient.invalidateQueries({ queryKey: [ARTICLES_QUERY_KEY] })
    }
  })
}

// Hook to delete an article
export const useDeleteArticle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => articleService.deleteArticle(id),
    onSuccess: () => {
      // Invalidate articles query to refresh the list
      queryClient.invalidateQueries({ queryKey: [ARTICLES_QUERY_KEY] })
    }
  })
}
