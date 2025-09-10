import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.string().min(1, 'Status is required'),
})

const TaskForm = ({ initialValues = {}, onSubmit, isLoading = false }) => {
  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialValues.title || '',
      description: initialValues.description || '',
      status: initialValues.status || 'Pending',
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register('title')} {...field} />
              {errors.title && (
                <FormMessage>{errors.title.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="description">Description</Label>
              <Input id="description" {...register('description')} {...field} />
              {errors.description && (
                <FormMessage>{errors.description.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          name="status"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                {...register('status')}
                list="status-options"
                {...field}
              />
              <datalist id="status-options">
                <option value="Pending" />
                <option value="In Progress" />
                <option value="Completed" />
              </datalist>
              {errors.status && (
                <FormMessage>{errors.status.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Task'}
        </Button>
      </form>
    </Form>
  )
}

export default TaskForm
