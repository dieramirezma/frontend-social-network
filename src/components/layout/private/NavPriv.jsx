import { NavLink } from 'react-router-dom'
import avatar from '../../../assets/img/user.png'
import { Global } from '../../../helpers/Global'
import useAuth from '../../../hooks/useAuth'

export const NavPriv = () => {
  // Usamos el hook Auth para tener disponible el objeto del usuario identificado.
  const { auth } = useAuth()

  return (
    <nav className='navbar__container-lists'>

      <ul className='container-lists__menu-list'>
        <li className='menu-list__item'>
          <NavLink to='/social' className='menu-list__link'>
            <i className='fa-solid fa-house' />
            <span className='menu-list__title'>Inicio</span>
          </NavLink>
        </li>

        <li className='menu-list__item'>
          <NavLink to='/social/feed' className='menu-list__link'>
            <i className='fa-solid fa-list' />
            <span className='menu-list__title'>Timeline</span>
          </NavLink>
        </li>

        <li className='menu-list__item'>
          <NavLink to='/social/people' className='menu-list__link'>
            <i className='fa-solid fa-users' />
            <span className='menu-list__title'>Gente</span>
          </NavLink>
        </li>
      </ul>

      <ul className='container-lists__list-end'>
        <li className='list-end__item'>
          <div className='img-avatar-nav'>
            {auth.image !== 'default.png' && <img src={Global.API_URL + 'user/avatar/' + auth.image} className='container-avatar__img' alt='Foto de perfil' />}
            {auth.image === 'default.png' && <img src={avatar} className='container-avatar__img' alt='Foto de perfil' />}
          </div>
        </li>
        <li className='list-end__item'>
          <a href='#' className='list-end__link'>
            <span className='list-end__name'>{auth.nick}</span>
          </a>
        </li>
        <li className='list-end__item'>
          <NavLink to='/social/settings' className='list-end__link'>
            <i className='fa-solid fa-gear' />
            <span className='list-end__name'>Ajustes</span>
          </NavLink>
        </li>
        <li className='list-end__item'>
          <NavLink to='/social/logout' className='list-end__link'>
            <i className='fa-solid fa-arrow-right-from-bracket' />
            <span className='list-end__name'>Cerrar sesión</span>
          </NavLink>
        </li>
      </ul>

    </nav>
  )
}
