import { createFileRoute } from '@tanstack/react-router'
import { ArticleForm } from '@/components/articles/ArticleForm'

export const Route = createFileRoute('/(main)/_layout/articles/new')({
  component: NewArticlePage
})

function NewArticlePage() {
  return (
    <div className='container mx-auto py-6'>
      <ArticleForm />
    </div>
  )
}
