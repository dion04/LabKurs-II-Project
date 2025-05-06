import { createFileRoute, useParams } from '@tanstack/react-router'
import { ArticleDetail } from '@/components/articles/ArticleDetail'

export const Route = createFileRoute('/(main)/_layout/articles/$articleId')({
  component: ArticleDetailPage
})

function ArticleDetailPage() {
  const { articleId } = useParams({
    from: '/(main)/_layout/articles/$articleId'
  })

  return (
    <div className='container mx-auto py-6'>
      <ArticleDetail articleId={Number(articleId)} />
    </div>
  )
}
