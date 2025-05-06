import { createFileRoute } from '@tanstack/react-router'
import { ArticlesList } from '@/components/articles/ArticlesList'

export const Route = createFileRoute('/(main)/_layout/articles/')({
  component: ArticlesIndexPage
})

function ArticlesIndexPage() {
  return (
    <div className='container mx-auto py-6'>
      <ArticlesList />
    </div>
  )
}
