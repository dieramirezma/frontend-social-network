import { Outlet } from 'react-router-dom'
import { HeaderPriv } from './HeaderPriv'
import { Sidebar } from './Sidebar'

export const PrivateLayout = () => {
  return (
    <>
      <HeaderPriv />

      <section className='layout__content'>
        <Outlet />
      </section>

      <Sidebar />
    </>
  )
}
