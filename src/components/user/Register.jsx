import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const Register = () => {
  const { form, changed } = useForm({})

  const [saved, setSaved] = useState('not sended')

  const navigate = useNavigate()

  const saveUser = async (e) => {
    e.preventDefault()
    const newUser = form

    const URL = `${Global.API_URL}user/register`

    const options = {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // Save user in database
    const request = await fetch(URL, options)

    const data = await request.json()

    // Verificar si el estado de la respuesta del backend es "created" seteamos la variable saved con "saved" y si no, le asignamos "error", esto es para mostrar por pantalla el resultado del registro del usuario
    if (data.status === 'created') {
      setSaved('saved')

      // Mostrar modal de éxito
      Swal.fire({
        title: '¡Usuario registrado correctamente!',
        icon: 'success',
        confirmButtonText: 'Continuar'
      }).then(() => {
        // Redirigir después de cerrar el modal
        navigate('/login')
      })
    } else {
      setSaved('error')

      // Mostrar modal de error
      Swal.fire({
        title: '¡El usuario no se ha registrado!',
        icon: 'error',
        confirmButtonText: 'Intentar nuevamente'
      })
    }
  }

  return (
    <>
      <header className='content__header content__header--public'>
        <h1 className='content__title'>Registro</h1>
      </header>

      <div className='content__posts'>
        <div className='form-style'>
          {/* Respuestas de usuario registrado */}
          {saved === 'saved'
            ? (
              <strong className='alert alert-success'>¡Usuario registrado correctamente!</strong>
              )
            : ''}
          {saved === 'error'
            ? (
              <strong className='alert alert-danger'>¡El usuario no se ha registrado!</strong>
              )
            : ''}
          <form className='register-form' onSubmit={saveUser}>
            <div className='form-group'>
              <label htmlFor='name'>Nombres</label>
              <input type='text' id='name' name='name' onChange={changed} required />
            </div>
            <div className='form-group'>
              <label htmlFor='lastname'>Apellidos</label>
              <input type='text' id='lastname' name='lastname' onChange={changed} required />
            </div>
            <div className='form-group'>
              <label htmlFor='nick'>Nick</label>
              <input type='text' id='nick' name='nick' onChange={changed} required />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Correo Electrónico</label>
              <input type='email' id='email' name='email' onChange={changed} required />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Contraseña</label>
              <input type='password' id='password' name='password' onChange={changed} required />
            </div>

            <input type='submit' value='Regístrate' className='btn btn-success' />
          </form>
        </div>
      </div>

    </>
  )
}
