import useAuth from '../../hooks/useAuth'

export const Config = () => {
  const { auth } = useAuth()

  const updateUser = async (e) => {
    e.preventDefault()

    console.log(auth)
  }
  return (
    <>
      <header className='content__header content__header--public'>
        <h1 className='content__title'>Modificar Datos de Usuario</h1>
      </header>
      <div className='content__posts'>

        <div className='form-style'>
          {/* Respuestas de usuario actualizado */}

          <form className='config-form' onSubmit={updateUser}>

            <div className='form-group'>
              <label htmlFor='name'>Nombres</label>
              <input type='text' name='name' required defaultValue={auth.name} />
            </div>

            <div className='form-group'>
              <label htmlFor='last_name'>Apellidos</label>
              <input type='text' name='last_name' required defaultValue={auth.lastname} />
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
                <div className='general-info__container-avatar' />
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
