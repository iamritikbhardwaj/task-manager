import React, { useState } from 'react'
import TaskForm from '../../components/forms/taskForm'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { BASE_URL } from '../../constants'
import { useSelector } from 'react-redux'

const CreateTaskPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)
  const userId = auth?.user?._id
  const token = auth?.token
  console.log(userId)
  
  if (!userId) {
    toast.error('User not logged in')
    navigate('/login')
  }

  const handleCreate = async (data) => {
    data.userId = userId
    setLoading(true)
    try {
      const res = await axios.post(`${BASE_URL}/api/tasks/${userId}`, JSON.stringify(data), {
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

      toast.success('Task created')
      navigate('/task')
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
