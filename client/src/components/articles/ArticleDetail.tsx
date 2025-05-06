import { useNavigate } from '@tanstack/react-router'
import { useArticle, useDeleteArticle } from '@/hooks/useArticles'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
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
import { useToast } from '@/components/ui/use-toast'

interface ArticleDetailProps {
  articleId: number
}

export function ArticleDetail({ articleId }: ArticleDetailProps) {
  const { data, isLoading, isError } = useArticle(articleId)
  const deleteArticle = useDeleteArticle()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleDelete = async () => {
    try {
      await deleteArticle.mutateAsync(articleId)
      toast({
        title: 'Success',
        description: 'Article deleted successfully'
      })
      navigate({ to: '/articles' })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete the article',
        variant: 'destructive'
      })
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className='h-10 w-2/3 mb-2' />
          <Skeleton className='h-5 w-1/3' />
        </CardHeader>
        <CardContent className='space-y-4'>
          <Skeleton className='h-40 w-full' />
          <Skeleton className='h-40 w-full' />
        </CardContent>
        <CardFooter>
          <Skeleton className='h-10 w-20 mr-2' />
          <Skeleton className='h-10 w-20' />
        </CardFooter>
      </Card>
    )
  }

  if (isError || !data) {
    return (
      <div className='text-center py-10'>
        <h2 className='text-2xl font-bold mb-4'>Article Not Found</h2>
        <p className='mb-6'>
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate({ to: '/articles' })}>
          Back to Articles
        </Button>
      </div>
    )
  }
  console.log('articleId', data.data)
  const formattedDate = new Date(data.data.updatedAt).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  )

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className='mb-4'>
        {paragraph}
      </p>
    ))
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <Card className='mb-6'>
        <CardHeader>
          <div className='flex justify-between items-start mb-2'>
            <CardTitle className='text-3xl'>{data.data.title}</CardTitle>
          </div>
          <div className='text-sm text-gray-500 dark:text-gray-400'>
            By {data.data.author?.name} • {formattedDate}
          </div>
        </CardHeader>
        <CardContent className='prose dark:prose-invert max-w-none'>
          {formatContent(data.data.content)}
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button
            variant='outline'
            onClick={() => navigate({ to: '/articles' })}
          >
            Back to Articles
          </Button>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              onClick={() =>
                navigate({
                  to: '/articles/$articleId/edit',
                  params: { articleId: data.data.id.toString() }
                })
              }
            >
              Edit Article
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive'>Delete Article</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the article.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
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
    </div>
  )
}
