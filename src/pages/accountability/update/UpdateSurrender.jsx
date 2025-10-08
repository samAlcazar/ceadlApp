import Data from '../../../hooks/Data'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const UpdateSurrender = () => {
  const user = Authorized()
  const { idSurrender } = useParams()

  const surrenderLink = idSurrender ? `surrender/${idSurrender}` : null
  const surrender = Data(surrenderLink)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!user || !user.idUser) {
      console.error('Usuario no autenticado')
      return
    }

    const body = {
      // Agregar campos específicos del surrender aquí
      idUser: user.idUser
    }

    fetch(`${URL}surrender/${idSurrender}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar surrender')
        }
        return response.json()
      })
      .then(data => {
        console.log('Surrender actualizado:', data)
        window.location.reload()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  if (!idSurrender) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando surrender...</h1>
      </main>
    )
  }

  if (surrender.loading) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando datos del surrender...</h1>
      </main>
    )
  }

  if (surrender.error) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Error al cargar surrender</h1>
        <p>Error: {surrender.error}</p>
      </main>
    )
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Actualizar Surrender</h1>

      <form onSubmit={handleSubmit}>
        {/* Agregar campos específicos del surrender aquí */}
        <button type='submit'>Actualizar Surrender</button>
      </form>
    </main>
  )
}

export default UpdateSurrender
