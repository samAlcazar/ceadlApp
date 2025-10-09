import Data from '../../../hooks/Data'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const UpdateBudget = () => {
  const user = Authorized()
  const { idApplication } = useParams()

  const budgetsLink = idApplication ? `budgets/application/${idApplication}` : null
  const budgets = Data(budgetsLink)
  const founders = Data('founders')
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
      idFounder: e.target.idFounder.value,
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
      idApplication,
      idFounder: e.target.idFounder.value,
      idUser: user.idUser
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
    <main className='w-screen h-screen flex flex-col items-center bg-gray-100'>
      <section className='pt-20 pb-6 flex flex-col items-center w-[1000px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
        <h1 className='text-white text-2xl mb-8'>Actualizar items de solicitud</h1>
        {/* Verificamos que los datos existan y tengan la estructura correcta */}
        {budgets.data && budgets.data[0] && budgets.data[0].list_budgets_by_application && (
          <div className='w-full grid grid-cols-4 gap-4 px-4 mb-6 text-sm'>
            {budgets.data[0].list_budgets_by_application.map((budget, index) => (
              <form onSubmit={handleSubmit} key={budget.id_budget} className='bg-cyan-800 p-4 rounded-lg flex flex-col gap-2'>
                <h3 className='text-cyan-50 text-sm font-semibold'>Item {index + 1}</h3>
                <label className='hidden'>
                  <input
                    type='text'
                    value={budget.id_budget}
                    name='idBudget'
                    readOnly
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Cantidad:</p>
                  <input
                    type='number'
                    name='quantity'
                    defaultValue={budget.quantity}
                    min='1'
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 w-[170px]'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Código:</p>
                  <input
                    type='text'
                    name='code'
                    defaultValue={budget.code}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 w-[170px]'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Descripción:</p>
                  <input
                    type='text'
                    defaultValue={budget.description}
                    name='description'
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 w-[170px]'
                  />
                </label>
                <div className='flex gap-4'>
                  <label className='grid text-cyan-50'>
                    <p className='text-cyan-50'>Importe USD:</p>
                    <input
                      type='number'
                      name='importUSD'
                      step='0.01'
                      min='0'
                      defaultValue={budget.import_usd}
                      className='pl-2 py-1 mt-1 rounded-md bg-cyan-700 w-[60px]'
                    />
                  </label>
                  <label className='grid text-cyan-50'>
                    <p className='text-cyan-50'>Importe BOB:</p>
                    <input
                      type='number'
                      name='importBOB'
                      step='0.01'
                      min='0'
                      defaultValue={budget.import_bob}
                      className='pl-2 py-1 mt-1 rounded-md bg-cyan-700 w-[60px]'
                    />
                  </label>
                </div>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Financiador:</p>
                  <select
                    name='idFounder'
                    defaultValue={budget.id_founder}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 w-[170px]'
                  >
                    <option value=''>Seleccionar financiador</option>
                    {founders.data && founders.data.map((founder) => (
                      <option key={founder.id_founder} value={founder.id_founder}>
                        {founder.name_founder}
                      </option>
                    ))}
                  </select>
                </label>
                <div className=''>
                  <button type='submit' className='w-[80px] mr-1.5 py-1 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white text-sm flex-1'>
                    Actualizar
                  </button>
                  <button
                    type='button'
                    className='w-[80px] py-1 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm flex-1'
                    onClick={() => handleDelete(budget.id_budget)}
                  >
                    Eliminar
                  </button>
                </div>
              </form>
            ))}
          </div>
        )}
        {(!budgets.data || !budgets.data[0] || !budgets.data[0].list_budgets_by_application) && (
          <div className='text-center mb-6'>
            <h2 className='text-white text-lg mb-2'>No hay presupuestos disponibles</h2>
            <p className='text-cyan-200'>Esta aplicación aún no tiene presupuestos creados.</p>
          </div>
        )}

        <h2 className='text-white text-lg mb-4'>Agregar nuevo presupuesto</h2>
        <form onSubmit={handleAddSubmit} className='grid grid-cols-2 gap-2 w-4/5 text-sm'>
          <div className='grid gap-2'>
            <label className='grid text-cyan-50'>
              <p className='text-cyan-50'>Cantidad:</p>
              <input type='number' name='quantity' min='1' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
            </label>
            <label className='grid text-cyan-50'>
              <p className='text-cyan-50'>Código:</p>
              <input type='text' name='code' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
            </label>
            <label className='grid text-cyan-50'>
              <p className='text-cyan-50'>Descripción:</p>
              <input type='text' name='description' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
            </label>
          </div>
          <div>
            <label className='grid text-cyan-50 mb-2'>
              <p className='text-cyan-50'>Importe USD:</p>
              <input type='number' name='importUSD' step='0.01' min='0' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
            </label>
            <label className='grid text-cyan-50 mb-2'>
              <p className='text-cyan-50'>Importe BOB:</p>
              <input type='number' name='importBOB' step='0.01' min='0' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
            </label>
            <label className='grid text-cyan-50'>
              <p className='text-cyan-50'>Financiador:</p>
              <select name='idFounder' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700'>
                <option value=''>Seleccionar financiador</option>
                {founders.data && founders.data.map((founder) => (
                  <option key={founder.id_founder} value={founder.id_founder}>
                    {founder.name_founder}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white col-span-2'>Agregar</button>
        </form>
        <a href='/applications/history' className='mt-6 text-cyan-200 hover:text-white'>Finalizar</a>
      </section>
    </main>
  )
}

export default UpdateBudget
