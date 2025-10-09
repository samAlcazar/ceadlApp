import { URL } from '../../../utils/url.js'

const Nav = ({ nameUser, chargeUser }) => {
  const handleClick = () => {
    fetch(`${URL}login/logout`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        window.location.href = '/'
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }
  return (
    <nav className='fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-cyan-900 to-cyan-700 flex justify-between items-center px-6 shadow-lg z-50'>
      <div className='flex items-center'>
        <h1 className='text-2xl font-bold text-white'>
          <a href='/' className='hover:text-cyan-200 transition-colors duration-200'>
            Ceadl App
          </a>
        </h1>
      </div>
      <div className='flex items-center gap-4'>
        <div className='flex flex-col text-right'>
          <span className='text-white font-medium text-sm'>{nameUser}</span>
          <span className='text-cyan-200 text-xs'>{chargeUser}</span>
        </div>
        <div className='w-px h-8 bg-cyan-400' />
        <button
          className='px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md transition-colors duration-200 font-medium text-sm shadow-md hover:shadow-lg'
          onClick={handleClick}
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  )
}

export default Nav
