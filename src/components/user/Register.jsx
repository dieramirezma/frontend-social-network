import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global'

export const Register = () => {
  const { form, changed } = useForm({})

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

    console.log(data)
  }

  return (
    <>
      <header className='content__header content__header--public'>
        <h1 className='content__title'>Registro</h1>
      </header>

      <div className='content__posts'>
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
    </>
  )
}
