import { useState, useEffect } from 'react'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'
import Data from '../../../hooks/Data'

const CreateBudget = () => {
  const user = Authorized()
  const { idApplication } = useParams()
  const [allBudgets, setAllBudgets] = useState([])
  const [budgets, setBudgets] = useState([])

  const founders = Data('founders')
  console.log(founders)

  // useEffect para ver cuando cambia el estado
  useEffect(() => {
    console.log('Presupuestos actualizados:', budgets)
  }, [budgets])

  const pushBudget = (e) => {
    e.preventDefault()

    // Acceder al formulario desde el botón
    const form = e.target.closest('form')
    const body = {
      quantity: parseInt(form.quantity.value),
      code: form.code.value,
      description: form.description.value,
      importUSD: parseFloat(form.importUSD.value),
      importBOB: parseFloat(form.importBOB.value),
      idApplication,
      idFounder: form.idFounder.value,
      idUser: user.idUser
    }

    setBudgets([...budgets, body])

    // Limpiar el formulario después de agregar
    form.reset()
  }

  const removeBudget = (index) => {
    setBudgets(budgets.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`${URL}budgets/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(budgets)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Presupuestos subidos con éxito:', data)
        setAllBudgets(data)
      })
      .catch((error) => {
        console.error('Error al subir los presupuestos:', error)
      })
  }

  return (
    <main className='w-screen h-screen flex flex-col items-center bg-gray-100'>
      <section className='flex flex-col items-center w-[1000px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto px-6 pt-20 pb-8'>
        <h1 className='text-white text-2xl mb-8'>Crear Presupuesto</h1>

        <form className='grid grid-cols-2 gap-2 w-4/5 bg-cyan-800 p-6 rounded-lg text-sm'>
          <div className=''>
            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50 mb-2'>Cantidad:</p>
              <input
                type='number'
                name='quantity'
                min='1'
                required
                className='px-2 py-1 rounded-md bg-cyan-700 text-white placeholder-cyan-300'
              />
            </label>

            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50 mb-2'>Código:</p>
              <input
                type='text'
                name='code'
                required
                className='px-2 py-1 rounded-md bg-cyan-700 text-white placeholder-cyan-300'
              />
            </label>

            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50 mb-2'>Descripción:</p>
              <input
                type='text'
                name='description'
                required
                className='px-2 py-1 rounded-md bg-cyan-700 text-white placeholder-cyan-300'
              />
            </label>
          </div>
          <div className=''>
            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50 mb-2'>Importe USD:</p>
              <input
                type='number'
                name='importUSD'
                step='0.01'
                min='0'
                required
                className='px-2 py-1 rounded-md bg-cyan-700 text-white placeholder-cyan-300'
              />
            </label>

            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50 mb-2'>Importe BOB:</p>
              <input
                type='number'
                name='importBOB'
                step='0.01'
                min='0'
                required
                className='px-2 py-1 rounded-md bg-cyan-700 text-white placeholder-cyan-300'
              />
            </label>
            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50 mb-2'>Financiador:</p>
              <select name='idFounder' className='px-2 py-1 rounded-md bg-cyan-700 text-white'>
                <option value=''>Seleccionar financiador</option>
                {founders.data && founders.data[0]
                  ? founders.data.map((founder) => (
                    <option key={founder.id_founder} value={founder.id_founder}>
                      {founder.name_founder}
                    </option>
                  ))
                  : null}
              </select>
            </label>
          </div>

          <button
            type='button'
            onClick={pushBudget}
            className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white col-span-2'
          >
            Agregar Presupuesto
          </button>
        </form>

        {budgets.length > 0 && (
          <section className='mt-6 w-4/5'>
            <h2 className='text-white text-lg mb-4'>Presupuestos Agregados</h2>
            <div className='space-y-3 grid grid-cols-2 gap-4'>
              {budgets.map((budget, index) => {
                // Buscar el nombre del financiador basándose en el ID
                const founderName = (founders.data && founders.data.find(
                  founder => founder.id_founder.toString() === budget.idFounder.toString()
                )?.name_founder) || 'Financiador no encontrado'

                return (
                  <div key={index} className='bg-cyan-800 p-4 rounded-lg'>
                    <div className='text-cyan-50 space-y-1 grid grid-cols-2 gap-4'>
                      <div>
                        <p><span className='font-semibold'>Cantidad:</span> {budget.quantity}</p>
                        <p><span className='font-semibold'>Código:</span> {budget.code}</p>
                        <p><span className='font-semibold'>Descripción:</span> {budget.description}</p>
                      </div>
                      <div>
                        <p><span className='font-semibold'>USD:</span> ${budget.importUSD}</p>
                        <p><span className='font-semibold'>BOB:</span> Bs {budget.importBOB}</p>
                        <p><span className='font-semibold'>Financiador:</span> {founderName}</p>
                      </div>
                    </div>
                    <button
                      type='button'
                      onClick={() => removeBudget(index)}
                      className='mt-4 px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white'
                    >
                      Eliminar
                    </button>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {budgets.length > 0 && (
          <button
            onClick={handleSubmit}
            className='mt-6 px-6 py-3 rounded-md bg-green-600 hover:bg-green-500 text-white font-semibold'
          >
            Subir Todos los Presupuestos
          </button>
        )}

        {allBudgets.length > 0 && (
          <section className='mt-6 w-full max-w-md'>
            <h2 className='text-white text-lg mb-4'>Presupuestos Subidos</h2>
            <a href='/applications/history' className='text-cyan-50 underline '>Finalizar</a>
          </section>
        )}
      </section>
    </main>
  )
}

export default CreateBudget
