import { useState } from 'react'
import { URL } from '../../../utils/url'
import logo from '../../assets/logo.svg'

const Login = () => {
  const [validated, setValidated] = useState(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      nickUser: e.target.nickUser.value,
      passwordUser: e.target.passwordUser.value
    }

    fetch(`${URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        setValidated(data.user[0].validate_user.validated)
        if (data.user[0].validate_user.validated) {
          setTimeout(() => {
            window.location.href = '/'
          }, 3000)
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }
  return (
    <main className='w-full h-screen flex flex-col justify-center items-center bg-gray-100 gap-4'>
      <img className='w-2xs' src={logo} alt='Ceadl Logo' />
      <h1 className='text-3xl text-white'>Login Page</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg mt-4'>
        <label>
          Usuario
          <input type='text' name='nickUser' />
        </label>
        <label>
          Contraseña
          <input type='password' name='passwordUser' />
        </label>
        <button type='submit'>Ingresar</button>
      </form>
      <div>
        {validated === true && <p>Login successful!</p>}
        {validated === false && <p>Login failed. Please try again.</p>}
      </div>
    </main>
  )
}

export default Login
