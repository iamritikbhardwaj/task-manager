import React, { useEffect, useState } from 'react'
import TaskForm from '../../components/forms/taskForm'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { BASE_URL } from '../../constants'
import { useSelector } from 'react-redux'

const EditTaskPage = () => {
  const [loading, setLoading] = useState(false)
  const [initialData, setInitialData] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()
  const auth = useSelector((state) => state.auth)
  const token = auth?.token

  if (!auth?.user?._id) {
    toast.error('User not logged in')
    navigate('/login')
  }

  const fetchTask = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${BASE_URL}/api/tasks/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(res)
      if (!res.status === 201) {
        const err = await res.json()
        throw new Error(err.message)
      }

      const data = await res.data
      setInitialData(data)
    } catch (err) {
      toast.error(err.message || 'Failed to fetch task')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchTask()
  }, [id])

  const handleUpdate = async (updatedData) => {
    setLoading(true)
    try {
      const res = await axios.put(`${BASE_URL}/api/tasks/${id}`, JSON.stringify(updatedData), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.status === 200) {
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
