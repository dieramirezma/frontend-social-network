import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrivateLayout } from '../components/layout/private/PrivateLayout'
import { Login } from '../components/user/Login'
import { Register } from '../components/user/Register'

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateLayout />} />
        <Route index element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
