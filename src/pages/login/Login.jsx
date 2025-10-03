import logo from '../../assets/logo.svg'

const Login = () => {
  return (
    <main className='w-full h-screen flex flex-col justify-center items-center bg-gray-500 gap-4'>
      <img className='w-2xs' src={logo} alt='Ceadl Logo' />
      <h1 className='text-3xl text-white'>Login Page</h1>
      <form className='flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg mt-4'>
        <label>
          Usuario
          <input type='text' name='nickUser' />
        </label>
        <label>
          Contraseña
          <input type='password' name='password' />
        </label>
        <button type='submit'>Ingresar</button>
      </form>
    </main>
  )
}

export default Login
