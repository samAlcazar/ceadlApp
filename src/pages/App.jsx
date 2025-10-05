import { Outlet } from 'react-router-dom'
import Nav from '../components/moleculas/Nav'
import Authorized from '../hooks/Authorized'

const App = () => {
  const user = Authorized()

  if (user === null) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <h1 className='text-2xl font-bold mb-4'>Bienvenido a nuestra APP</h1>
        <p className='text-gray-600'>Por favor, <a href='/login' className='text-blue-500 hover:underline'>inicia sesión</a> para continuar.</p>
      </div>
    )
  }

  return (
    <>
      <Nav nameUser={user.nameUser} chargeUser={user.chargeUser} />
      <Outlet />
    </>
  )
}

export default App
