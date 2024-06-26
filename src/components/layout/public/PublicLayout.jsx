import { Outlet } from 'react-router-dom'
import { HeaderPub } from './HeaderPub'

export const PublicLayout = () => {
  return (
    <>
      <HeaderPub />

      <section className='layout__content'>
        <Outlet />
      </section>
    </>
  )
}
