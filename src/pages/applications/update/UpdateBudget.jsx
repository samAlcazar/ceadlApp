import Data from '../../../hooks/Data'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const UpdateBudget = () => {
  const user = Authorized()
  const { idBudget } = useParams()

  const budgetLink = idBudget ? `budget/${idBudget}` : null
  const budget = Data(budgetLink)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!user || !user.idUser) {
      console.error('Usuario no autenticado')
      return
    }

    const body = {
      // Agregar campos específicos del budget aquí
      idUser: user.idUser
    }

    fetch(`${URL}budget/${idBudget}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar budget')
        }
        return response.json()
      })
      .then(data => {
        console.log('Budget actualizado:', data)
        window.location.reload()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  if (!idBudget) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando presupuesto...</h1>
      </main>
    )
  }

  if (budget.loading) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando datos del presupuesto...</h1>
      </main>
    )
  }

  if (budget.error) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Error al cargar presupuesto</h1>
        <p>Error: {budget.error}</p>
      </main>
    )
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Actualizar Presupuesto</h1>

      <form onSubmit={handleSubmit}>
        {/* Agregar campos específicos del presupuesto aquí */}
        <button type='submit'>Actualizar Presupuesto</button>
      </form>
    </main>
  )
}

export default UpdateBudget
