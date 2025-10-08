import { useState, useEffect } from 'react'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const CreateBudget = () => {
  const user = Authorized()
  const { idApplication, idFounder } = useParams()
  const [allBudgets, setAllBudgets] = useState([])
  const [budgets, setBudgets] = useState([])

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
      idFounder,
      idUser: user.idUser
    }

    setBudgets([...budgets, body])

    // Limpiar el formulario después de agregar
    form.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`${URL}budget/bulk`, {
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
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Crear Presupuesto</h1>
      <div>
        <strong>ID Aplicación:</strong> {idApplication || 'No definido'}
      </div>
      <div>
        <strong>ID Fundador:</strong> {idFounder || 'No definido'}
      </div>

      <form>
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

        <button type='button' onClick={pushBudget}>Agregar Presupuesto</button>
      </form>

      <section>
        <h2>Presupuestos Agregados</h2>
        {budgets.map((budget, index) => (
          <div key={index}>
            <p>Cantidad: {budget.quantity}</p>
            <p>Código: {budget.code}</p>
            <p>Descripción: {budget.description}</p>
            <p>USD: ${budget.importUSD}</p>
            <p>BOB: Bs {budget.importBOB}</p>
          </div>
        ))}
      </section>

      <button onClick={handleSubmit}>Subir Todos los Presupuestos</button>

      <section>
        <h2>Presupuestos Subidos</h2>
        {allBudgets.map((budget, index) => (
          <div key={index}>
            <p>ID: {budget.id_budget}</p>
            <p>Cantidad: {budget.quantity}</p>
            <p>Código: {budget.code}</p>
            <p>Descripción: {budget.description}</p>
            <p>USD: ${budget.import_usd}</p>
            <p>BOB: Bs {budget.import_bob}</p>
          </div>
        ))}
      </section>
    </main>
  )
}

export default CreateBudget
