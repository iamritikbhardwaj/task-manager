import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LoginPage from './pages/login.page.jsx'
import RegisterPage from './pages/regiter.page'
import TaskPage from './pages/task/task.page'
import CreateTaskPage from './pages/task/createTask.page.jsx'
import EditTaskPage from './pages/task/editTask.page.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

const auth = store.getState().auth
const token = auth?.token

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/*" element={token === undefined ? <TaskPage /> : <App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='*' element={<div>404 Not Found</div>} />
        <Route path='/task' element={<TaskPage />} />
        <Route path='/task/create' element={<CreateTaskPage />} />
        <Route path='/task/edit/:id' element={<EditTaskPage />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
