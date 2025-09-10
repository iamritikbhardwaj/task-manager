import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { BASE_URL } from '@/constants'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const TaskPage = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)
  const userId = auth?.user?._id

  if (!userId) {
    toast.error('User not logged in')
    navigate('/login')
  }

  const navigateToCreateTask = () => {
    navigate('/task/create')
  }

  const navigateToEditTask = (id) => {
    navigate(`/task/edit/${id}`)
  }

  const fetchTasks = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = auth?.token || "";

      const res = await axios.get(`${BASE_URL}/api/tasks?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(res.data)
      const data = await res.data

      if (!res.status === 200) {
        throw new Error(data.message || 'Failed to fetch tasks')
      }

      if (Array.isArray(data)){
        setTasks(data)
      } 
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
      const res = await axios.delete(`${BASE_URL}/api/tasks/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(res)
      if (!res.status === 201) {
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
          <Button onClick={navigateToCreateTask} disabled={loading}>
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
                    variant="destructive"
                    onClick={() => navigateToEditTask(task._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteTask(task._id)}
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