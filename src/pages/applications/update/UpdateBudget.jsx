import Data from '../../../hooks/Data'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const UpdateBudget = () => {
  const user = Authorized()
  const { idApplication } = useParams()

  const budgetsLink = idApplication ? `budgets/application/${idApplication}` : null
  const budgets = Data(budgetsLink)
  console.log(budgets)

  // Función para actualizar budgets existentes
  const handleSubmit = (e) => {
    e.preventDefault()

    const idBudget = e.target.idBudget.value

    const body = {
      quantity: Number(e.target.quantity.value),
      code: e.target.code.value,
      description: e.target.description.value,
      importUSD: parseFloat(e.target.importUSD.value),
      importBOB: parseFloat(e.target.importBOB.value),
      idUser: user.idUser,
      idApplication
    }

    fetch(`${URL}budgets/${idBudget}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el presupuesto')
        }
        return response.json()
      })
      .then(data => {
        console.log('Presupuesto actualizado:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleDelete = (idBudget) => {
    fetch(`${URL}budgets/${idBudget}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el presupuesto')
        }
        return response.json()
      })
      .then(data => {
        console.log('Presupuesto eliminado:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()

    const body = {
      quantity: Number(e.target.quantity.value),
      code: e.target.code.value,
      description: e.target.description.value,
      importUSD: parseFloat(e.target.importUSD.value),
      importBOB: parseFloat(e.target.importBOB.value),
      idUser: user.idUser,
      idApplication
    }

    fetch(`${URL}budgets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar el presupuesto')
        }
        return response.json()
      })
      .then(data => {
        console.log('Presupuesto agregado:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Actualizar Presupuestos</h1>
      {/* Verificamos que los datos existan y tengan la estructura correcta */}
      {budgets.data && budgets.data[0] && budgets.data[0].list_budgets_by_application && (
        <div className='flex gap-6'>
          {budgets.data[0].list_budgets_by_application.map((budget) => (
            <form onSubmit={handleSubmit} key={budget.id_budget} className='flex flex-col gap-4'>
              <h3>Presupuesto #{budget.id_budget}</h3>
              <label>
                ID Presupuesto:
                <input
                  type='text'
                  value={budget.id_budget}
                  name='idBudget'
                  readOnly
                />
              </label>
              <label>
                Cantidad:
                <input
                  type='number'
                  name='quantity'
                  defaultValue={budget.quantity}
                  min='1'
                />
              </label>
              <label>
                Código:
                <input
                  type='text'
                  name='code'
                  defaultValue={budget.code}
                />
              </label>
              <label>
                Descripción:
                <input
                  type='text'
                  defaultValue={budget.description}
                  name='description'
                />
              </label>
              <label>
                Importe USD:
                <input
                  type='number'
                  name='importUSD'
                  step='0.01'
                  min='0'
                  defaultValue={budget.import_usd}
                />
              </label>
              <label>
                Importe BOB:
                <input
                  type='number'
                  name='importBOB'
                  step='0.01'
                  min='0'
                  defaultValue={budget.import_bob}
                />
              </label>
              <button type='submit'>
                Actualizar
              </button>
              <button
                type='button'
                onClick={() => handleDelete(budget.id_budget)}
              >
                Eliminar
              </button>
            </form>
          ))}
        </div>
      )}
      {(!budgets.data || !budgets.data[0] || !budgets.data[0].list_budgets_by_application) && (
        <div>
          <h2>No hay presupuestos disponibles</h2>
          <p>Esta aplicación aún no tiene presupuestos creados.</p>
        </div>
      )}

      <h2>Agregar nuevo presupuesto</h2>
      <form onSubmit={handleAddSubmit}>
        <label>
          Cantidad:
          <input type='number' name='quantity' min='1' required />
        </label>
        <label>
          Código:
          <input type='text' name='code' required />
        </label>
        <label>
          Descripción:
          <input type='text' name='description' required />
        </label>
        <label>
          Importe USD:
          <input type='number' name='importUSD' step='0.01' min='0' required />
        </label>
        <label>
          Importe BOB:
          <input type='number' name='importBOB' step='0.01' min='0' required />
        </label>
        <button type='submit'>Agregar</button>
      </form>

      <a href='/'>Finalizar</a>
    </main>
  )
}

export default UpdateBudget
