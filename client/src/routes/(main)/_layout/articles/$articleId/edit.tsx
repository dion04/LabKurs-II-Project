import { createFileRoute } from '@tanstack/react-router'
import { ArticleForm } from '@/components/articles/ArticleForm'

export const Route = createFileRoute('/(main)/_layout/articles/$articleId/edit')({
  component: EditArticlePage
})

function EditArticlePage() {
  return (
    <div className='container mx-auto py-6'>
      <ArticleForm />
    </div>
  )
}
