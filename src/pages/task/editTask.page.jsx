import React, { useEffect, useState } from 'react'
import TaskForm from '@/components/TaskForm'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditTaskPage = () => {
  const [loading, setLoading] = useState(false)
  const [initialData, setInitialData] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.message)
        }

        const data = await res.json()
        setInitialData(data)
      } catch (err) {
        toast.error(err.message || 'Failed to fetch task')
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id])

  const handleUpdate = async (updatedData) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT', // or PATCH if your API supports it
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message)
      }

      toast.success('Task updated')
      navigate('/tasks')
    } catch (err) {
      toast.error(err.message || 'Failed to update task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-6 text-slate-800">Edit Task</h2>
      {initialData ? (
        <TaskForm onSubmit={handleUpdate} initialValues={initialData} isLoading={loading} />
      ) : (
        <p className="text-gray-500">Loading task...</p>
      )}
    </div>
  )
}

export default EditTaskPage
