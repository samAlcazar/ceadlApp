import { useState } from 'react'
import { URL } from '../../../utils/url'
import logo from '../../assets/logo.png'

const Login = () => {
  const [validated, setValidated] = useState(null)
  const [nickUser, setNickUser] = useState('')
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
        if (data?.user?.[0]) {
          const userValidation = data.user[0].validate_user?.validated
          const userName = data.user[0].validated_user?.nick_user
          setValidated(userValidation)
          setNickUser(userName || '')
          if (userValidation) {
            setTimeout(() => {
              window.location.href = '/'
            }, 3000)
          }
        } else {
          setValidated(false)
          setNickUser('')
        }
      })
      .catch(error => {
        console.error('Error:', error)
        setValidated(false)
        setNickUser('')
      })
  }
  return (
    <main className='w-full h-screen flex flex-col justify-center items-center bg-gray-100 gap-4'>
      <section className='relative w-[400px] h-[400px]'>
        <form onSubmit={handleSubmit} className='relative flex flex-col justify-center items-center w-full h-full rounded-2xl bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-hidden z-30'>
          <img src={logo} className='mb-8' />
          <label className='grid text-cyan-50 mb-4 w-3/4'>
            <p className='text-cyan-50'>Usuario</p>
            <input type='text' name='nickUser' className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <label className='grid text-cyan-50 mb-4 w-3/4'>
            <p className='text-cyan-50'>Contraseña</p>
            <input type='password' name='passwordUser' className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Ingresar</button>
        </form>
        <div className={`absolute w-[300px] h-[130px] ${validated === true ? 'top-[-60px]' : 'top-0'} flex flex-col text-center pt-2 bg-lime-700 rounded-4xl z-10 transition-all duration-1000 ease-in-out`}>
          <p className='text-white'>Bienvenida(o) <span className='font-bold text-xl'>{nickUser}</span></p>
          <p className='text-white'>En seguida serás redirigido...</p>
        </div>
        <div className={`absolute w-[300px] h-[100px] right-0 ${validated !== null && validated === false ? 'bottom-[-60px]' : 'bottom-0'} flex flex-col text-center pt-12 bg-red-700 rounded-4xl z-10 transition-all duration-1000 ease-in-out`}>
          <p className='text-white'>Login fallido. Por favor, inténtalo de nuevo.</p>
        </div>
      </section>
    </main>
  )
}

export default Login
