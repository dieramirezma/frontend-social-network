import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'
import { SerializeForm } from '../../helpers/SerializeForm'
import avatar from '../../assets/img/user.png'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Config = () => {
  const { auth } = useAuth()

  const [saved, setSaved] = useState('not_saved')

  const navigate = useNavigate()

  const updateUser = async (e) => {
    e.preventDefault()

    const newDataUser = SerializeForm(e.target)

    const file0 = newDataUser.file0

    delete newDataUser.file0

    let dataResponseFile = { status: 'success' }

    const request = await fetch(Global.API_URL + 'user/update', {
      method: 'PUT',
      body: JSON.stringify(newDataUser),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      }
    })

    const data = await request.json()

    if (file0.name && file0) {
      console.log('file0', file0)
      const formData = new FormData()
      formData.append('file0', file0)

      const request = await fetch(Global.API_URL + 'user/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

      dataResponseFile = await request.json()
    }

    if (data.status === 'success' && dataResponseFile.status === 'success') {
      setSaved('saved')

      Swal.fire({
        title: '¡Usuario actualizado correctamente!',
        icon: 'success',
        confirmButtonText: 'Continuar'
      }).then(() => {
        navigate('/login')
      })
    } else {
      setSaved('error')

      Swal.fire({
        title: '¡El usuario no se ha actualizado!',
        icon: 'error',
        confirmButtonText: 'Intentar nuevamente'
      })
    }
  }
  return (
    <>
      <header className='content__header content__header--public'>
        <h1 className='content__title'>Editar Usuario</h1>
      </header>
      <div className='content__posts'>

        <div className='form-style'>
          {/* Respuestas de usuario registrado */}
          {saved === 'saved'
            ? (
              <strong className='alert alert-success'>¡Usuario actualizado correctamente!</strong>
              )
            : ''}
          {saved === 'error'
            ? (
              <strong className='alert alert-danger'>¡El usuario no se ha actualizado!</strong>
              )
            : ''}

          <form className='config-form' onSubmit={updateUser}>

            <div className='form-group'>
              <label htmlFor='name'>Nombres</label>
              <input type='text' name='name' required defaultValue={auth.name} />
            </div>

            <div className='form-group'>
              <label htmlFor='lastname'>Apellidos</label>
              <input type='text' name='lastname' required defaultValue={auth.lastname} />
            </div>

            <div className='form-group'>
              <label htmlFor='nick'>Nick</label>
              <input type='text' name='nick' required defaultValue={auth.nick} />
            </div>

            <div className='form-group'>
              <label htmlFor='bio'>Bio</label>
              <textarea name='bio' defaultValue={auth.bio} />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Correo Electrónico</label>
              <input type='email' name='email' required defaultValue={auth.email} />
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Contraseña</label>
              <input type='password' name='password' required />
            </div>

            <div className='form-group'>
              <label htmlFor='file0'>Avatar</label>
              <div className='avatar'>
                <div className='general-info__container-avatar'>
                  {auth.image !== 'default.png' && <img src={Global.API_URL + 'user/avatar/' + auth.image} className='container-avatar__img' alt='Foto de perfil' />}
                  {auth.image === 'default.png' && <img src={avatar} className='container-avatar__img' alt='Foto de perfil' />}
                </div>
              </div>
              <br />
              <input type='file' name='file0' id='file' />
            </div>
            <input type='submit' value='Editar' className='btn btn-success' />

          </form>
        </div>
      </div>
    </>
  )
}
