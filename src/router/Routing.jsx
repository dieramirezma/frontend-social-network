import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrivateLayout } from '../components/layout/private/PrivateLayout'
import { Login } from '../components/user/Login'
import { Register } from '../components/user/Register'
import { PublicLayout } from '../components/layout/public/PublicLayout'
import { Feed } from '../components/publication/Feed'
import { Error404 } from '../components/layout/Error404'
import { AuthProvider } from '../context/AuthProvider'
import { Logout } from '../components/user/Logout'
import { People } from '../components/user/People'
import { Config } from '../components/user/Config'
import { Following } from '../components/follow/Following'
import { Followers } from '../components/follow/Followers'

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          {/* Private Routes */}
          <Route path='/social' element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path='feed' element={<Feed />} />
            <Route path='logout' element={<Logout />} />
            <Route path='following/:userId' element={<Following />} />
            <Route path='followers/:userId' element={<Followers />} />
            <Route path='people' element={<People />} />
            <Route path='settings' element={<Config />} />
          </Route>
          <Route path='*' element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
