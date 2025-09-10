import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'; // Adjust path based on your project structure
import { BASE_URL } from '../constants';
import { login } from '../redux/slices/authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const form = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, data, {
        withCredentials: true,
        headers: {
          "content-type": "application/json",
          credentials: "include",
        },
      });
      console.log(response.data, 'response');
      const json = await response.data.token;
      if (response.status === 200) {
        const user = response.data.user;
        const token = response.data.token;
        dispatch(login({ user: user, token: token }));
        navigate('/task');
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-w-full min-h-screen bg-muted px-4">
      <div className="w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
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
                    {...register('password', { required: 'Password is required' })}
                    {...field}
                  />
                  {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;