import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Global } from '../helpers/Global'

// Crear un contexto de autenticación
const AuthContext = createContext()

// Definir el componente proveedor de contexto AuthProvider
export const AuthProvider = ({ children }) => {
  // Estado local para guardar la información del usuario y verificar si está autenticado
  const [auth, setAuth] = useState({})

  // Estado para guardar los contadores
  const [counters, setCounters] = useState({})

  // La primera vez que se ejecute este contexto, se comprueba el token ejecutando authUser
  useEffect(() => {
    authUser()
  }, [])

  const authUser = async () => {
    // Obtener datos del usuario identificado del localstorage
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    // Comprobar si tengo el token y el user
    if (!token || !user) {
      return false
    }

    // Transformar los datos a un objeto de javascript
    const userObj = JSON.parse(user)
    const userId = userObj.id

    // Petición Ajax al backend que compruebe el token y que nos devuelva todos los datos del usuario
    const request = await fetch(Global.API_URL + 'user/profile/' + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })

    const data = await request.json()

    // Petición Ajax al backend para los contadores
    const requestCounters = await fetch(Global.API_URL + 'user/counters/' + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })

    const dataCounters = await requestCounters.json()

    // Setear el estado de Auth
    setAuth(data.user)

    // Setear el estado de Counters
    setCounters(dataCounters)
  }

  // Renderizar el proveedor de contexto con el contexto AuthContext.Provider
  return (
    <AuthContext.Provider
      value={{
        // Valores que se comparten a través del contexto
        auth,
        setAuth,
        counters
      }}
    >
      {children} {/* Renderiza los componentes hijos envueltos por el proveedor */}
    </AuthContext.Provider>
  )
}

// Definir propTypes para el componente AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired // children debe ser un nodo React y es requerido
}

export default AuthContext
