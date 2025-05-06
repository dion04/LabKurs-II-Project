import { useState } from 'react'
import { useArticles, useDeleteArticle } from '@/hooks/useArticles'
import type { Article } from '@/interfaces/article'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

export function ArticlesList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useArticles(page, 6)
  const deleteArticle = useDeleteArticle()
  const navigate = useNavigate()

  const handleDelete = (id: number) => {
    deleteArticle.mutate(id)
  }

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className='overflow-hidden'>
            <CardHeader className='pb-3'>
              <Skeleton className='h-5 w-2/3 mb-2' />
              <Skeleton className='h-4 w-1/2' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-20 w-full' />
            </CardContent>
            <CardFooter className='flex justify-end gap-2'>
              <Skeleton className='h-9 w-20' />
              <Skeleton className='h-9 w-20' />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className='text-center py-10'>
        Failed to load articles. Please try again later.
      </div>
    )
  }

  if (data?.articles.length === 0) {
    return (
      <div className='text-center py-10'>
        <p className='text-lg mb-4'>No articles found</p>
        <Button onClick={() => navigate({ to: '/articles/new' })}>
          Create Your First Article
        </Button>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold'>Articles</h2>
        <Button onClick={() => navigate({ to: '/articles/new' })}>
          New Article
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {data?.articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onEdit={() =>
              navigate({
                to: '/articles/$articleId/edit',
                params: { articleId: article.id.toString() }
              })
            }
            onDelete={() => handleDelete(article.id)}
            onView={() =>
              navigate({
                to: '/articles/$articleId',
                params: { articleId: article.id.toString() }
              })
            }
          />
        ))}
      </div>

      {/* Pagination */}
      {data && data.totalCount > 0 && (
        <Pagination className='mt-6'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => page > 1 && setPage((p) => Math.max(1, p - 1))}
                className={page === 1 ? 'opacity-50 pointer-events-none' : ''}
                size={undefined}
              />
            </PaginationItem>

            {Array.from({ length: Math.ceil(data.totalCount / data.limit) })
              .map((_, i) => (
                <PaginationItem
                  key={i}
                  className={page === i + 1 ? 'font-bold' : ''}
                >
                  <PaginationLink
                    onClick={() => setPage(i + 1)}
                    size={undefined}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
              .slice(0, 5)}

            {Math.ceil(data.totalCount / data.limit) > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                className={
                  page >= Math.ceil(data.totalCount / data.limit)
                    ? 'opacity-50 pointer-events-none'
                    : ''
                }
                onClick={() =>
                  page < Math.ceil(data.totalCount / data.limit) &&
                  setPage((p) => p + 1)
                }
                size={undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

interface ArticleCardProps {
  article: Article
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}

function ArticleCard({ article, onView, onEdit, onDelete }: ArticleCardProps) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString()
  const truncatedContent =
    article.content.length > 100
      ? `${article.content.substring(0, 100)}...`
      : article.content

  return (
    <Card className='overflow-hidden flex flex-col h-full'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-xl'>{article.title}</CardTitle>
        <CardDescription>
          {article.author?.name} • {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-grow'>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          {truncatedContent}
        </p>
      </CardContent>
      <CardFooter className='flex justify-between gap-2 pt-3'>
        <Button variant='outline' onClick={onView}>
          Read
        </Button>
        <div className='flex gap-2'>
          <Button variant='outline' size='icon' onClick={onEdit}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' />
              <path d='m15 5 4 4' />
            </svg>
            <span className='sr-only'>Edit</span>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='outline' size='icon' className='text-red-500'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M3 6h18' />
                  <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                  <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                  <line x1='10' x2='10' y1='11' y2='17' />
                  <line x1='14' x2='14' y1='11' y2='17' />
                </svg>
                <span className='sr-only'>Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  article.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  className='bg-red-500 hover:bg-red-600'
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  )
}
