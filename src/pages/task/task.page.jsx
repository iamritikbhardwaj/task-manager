import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'react-toastify'

const TaskPage = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTasks = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem('token')

      const res = await fetch('/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch tasks')
      }

      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || 'Delete failed')
      }

      toast.success('Task deleted')
      setTasks((prev) => prev.filter((task) => task.id !== id))
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">Your Tasks</h1>
          <Button onClick={() => toast.info('Create Task TODO')}>
            + New Task
          </Button>
        </div>

        {loading ? (
          <p className="text-slate-500 text-center">Loading tasks...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : tasks.length === 0 ? (
          <p className="text-slate-500 text-center">No tasks found.</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 border border-slate-200 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  <h2 className="text-lg font-medium text-slate-800">
                    {task.title}
                  </h2>
                  <p className="text-slate-600">{task.description}</p>
                  <span className="text-xs text-slate-500">Status: {task.status}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => toast.info('Edit Task TODO')}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskPage