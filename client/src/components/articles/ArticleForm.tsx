import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useArticle,
  useCreateArticle,
  useUpdateArticle
} from '@/hooks/useArticles'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters' })
    .max(100, { message: 'Title cannot exceed 100 characters' }),
  content: z
    .string()
    .min(10, { message: 'Content must be at least 10 characters' })
})

type FormValues = z.infer<typeof formSchema>

type ArticleFormProps = {
  articleId?: string
}

export function ArticleForm({ articleId }: ArticleFormProps) {
  const navigate = useNavigate()
  const { toast } = useToast()

  const isEditing = !!articleId
  const { data: articleData, isLoading: isLoadingArticle } = useArticle(
    articleId ? parseInt(articleId) : 0
  )
  const createArticleMutation = useCreateArticle()
  const updateArticleMutation = useUpdateArticle(
    articleId ? parseInt(articleId) : 0
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: ''
    }
  })

  useEffect(() => {
    if (isEditing && articleData?.article) {
      form.reset({
        title: articleData.article.title,
        content: articleData.article.content
      })
    }
  }, [isEditing, articleData, form])

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEditing && articleId) {
        await updateArticleMutation.mutateAsync(values)
        toast({ title: 'Success', description: 'Article updated successfully' })
        navigate({ to: '/articles/$articleId', params: { articleId } })
      } else {
        const result = await createArticleMutation.mutateAsync(values)
        toast({ title: 'Success', description: 'Article created successfully' })
        navigate({
          to: '/articles/$articleId',
          params: { articleId: result.article.id.toString() }
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was a problem saving your article',
        variant: 'destructive'
      })
    }
  }

  if (isEditing && isLoadingArticle) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className='h-8 w-1/3 mb-2' />
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-60 w-full' />
            <Skeleton className='h-10 w-32' />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? 'Edit Article' : 'Create New Article'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter article title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Write your article content here...'
                      className='min-h-[300px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex gap-3 justify-end'>
              <Button
                type='button'
                variant='outline'
                onClick={() => navigate({ to: '/articles' })}
                disabled={
                  createArticleMutation.isPending ||
                  updateArticleMutation.isPending
                }
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={
                  createArticleMutation.isPending ||
                  updateArticleMutation.isPending
                }
              >
                {createArticleMutation.isPending ||
                updateArticleMutation.isPending
                  ? 'Saving...'
                  : isEditing
                    ? 'Update Article'
                    : 'Create Article'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
