import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate()

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold text-slate-800">Welcome to TaskManager</h1>
        <p className="text-slate-600">Manage your tasks efficiently and stay organized.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/login')}
            className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
