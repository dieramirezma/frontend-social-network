import { Outlet } from 'react-router-dom'
import { HeaderPriv } from './HeaderPriv'

export const PrivateLayout = () => {
  return (
    <>
      <HeaderPriv />

      <section className='layout__content'>
        <Outlet />
      </section>
    </>
  )
}
