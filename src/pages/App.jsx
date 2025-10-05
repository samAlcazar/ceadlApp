import { Outlet } from 'react-router-dom'
import Nav from '../components/moleculas/Nav'
import { useState, useEffect } from 'react'
import { URL } from '../../utils/url'

const App = () => {
  const [user, setUser] = useState('')

  useEffect(() => {
    fetch(`${URL}login/authorized`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          console.log(data)
          setUser(data)
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error)
      })
  }, [])

  if (user === '') {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <h1 className='text-2xl font-bold mb-4'>Bienvenido a nuestra APP</h1>
        <p className='text-gray-600'>Por favor, <a href='/login' className='text-blue-500 hover:underline'>inicia sesión</a> para continuar.</p>
      </div>
    )
  }

  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}

export default App
