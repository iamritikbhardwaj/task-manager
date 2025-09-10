import React, { useState } from 'react'
import TaskForm from '@/components/TaskForm'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CreateTaskPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleCreate = async (data) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message)
      }

      toast.success('Task created')
      navigate('/tasks')
    } catch (err) {
      toast.error(err.message || 'Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-6 text-slate-800">Create Task</h2>
      <TaskForm onSubmit={handleCreate} isLoading={loading} />
    </div>
  )
}

export default CreateTaskPage
