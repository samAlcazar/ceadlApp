import { Outlet } from 'react-router-dom'
import Nav from '../components/moleculas/Nav'
import Authorized from '../hooks/Authorized'
import logo from '../assets/logo.png'

const App = () => {
  const user = Authorized()

  if (user === null) {
    return (
      <main className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <section className='relative flex flex-col justify-center items-center w-[400px] h-[400px] rounded-2xl bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-hidden'>
          <h1 className='text-cyan-50 text-2xl font-bold mb-4'>Bienvenido a nuestra APP</h1>
          <p className='text-white'>Por favor, <a href='/login' className='text-cyan-400 hover:underline'>inicia sesión</a> para continuar.</p>
          <img src={logo} className='absolute bottom-[12px] right-[12px] opacity-30' />
        </section>
      </main>
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
