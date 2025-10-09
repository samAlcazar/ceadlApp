import { Outlet, Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Print = () => {
  return (
    <main className='w-screen h-screen flex flex-col bg-gray-100'>
      <section className='w-3/4 mx-auto p-4 bg-white'>
        <div className='flex justify-between items-center mb-4'>
          <Link
            to='/'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200'
          >
            ← Regresar al inicio
          </Link>
          <img src={logo} alt='Logo' className='w-48' />
          <div className='w-32' /> {/* Spacer for centering */}
        </div>
        <div className='h-[1px] w-full bg-gray-500' />
        <Outlet />
      </section>
    </main>
  )
}

export default Print
