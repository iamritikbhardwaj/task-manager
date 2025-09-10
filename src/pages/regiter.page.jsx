import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const form = useForm()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const json = await response.json()

      if (response.ok) {
        toast.success('Registration successful!')
        navigate('/login')
      } else {
        toast.error(json.message || 'Registration failed')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error('Register error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-center mb-6 text-slate-800">
          Register
        </h1>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...register('name', { required: 'Name is required' })}
                    {...field}
                  />
                  {errors.name && (
                    <FormMessage>{errors.name.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register('email', { required: 'Email is required' })}
                    {...field}
                  />
                  {errors.email && (
                    <FormMessage>{errors.email.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    {...field}
                  />
                  {errors.password && (
                    <FormMessage>{errors.password.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Register'}
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-sm text-center text-slate-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-white  hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
