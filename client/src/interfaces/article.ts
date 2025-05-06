export interface Article {
  id: number
  title: string
  content: string
  authorId: number
  createdAt: string
  updatedAt: string
  author?: {
    id: number
    name: string
    email: string
    profileImageUrl?: string
  }
}

export interface CreateArticleRequest {
  title: string
  content: string
}

export interface UpdateArticleRequest {
  title?: string
  content?: string
}

export interface ArticleResponse {
  article: Article
}

export interface ArticlesResponse {
  articles: Article[]
  totalCount: number
  page: number
  limit: number
}
