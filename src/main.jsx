import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LoginPage from './pages/login.page.jsx'
import RegisterPage from './pages/regiter.page'
import TaskPage from './pages/task.page'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='*' element={<div>404 Not Found</div>} />
        <Route path='/task' element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
