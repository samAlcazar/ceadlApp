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
    <nav className='absolute top-0 left-0 w-full h-16 bg-blue-500 flex justify-center items-center'>
      <h1 className='text-3xl font-bold underline'><a href='/'>Ceadl App</a></h1>
      <p>{nameUser} | {chargeUser}</p>
      <button className='ml-4 p-2 bg-white rounded' onClick={handleClick}>Logout</button>
    </nav>
  )
}

export default Nav
