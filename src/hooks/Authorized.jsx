import { useEffect, useState } from 'react'
import { URL } from '../../utils/url.js'

const Authorized = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch(`${URL}login/authorized`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          setUser(data.user)
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error)
      })
  }, [])
  return user
}

export default Authorized
