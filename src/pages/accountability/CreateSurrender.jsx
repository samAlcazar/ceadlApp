import { useState, useEffect } from 'react'
import Authorized from '../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../utils/url'

const CreateSurrender = () => {
  const user = Authorized()
  const { idAccountability } = useParams()
  const [allSurrenders, setAllSurrenders] = useState([])
  const [surrenders, setSurrenders] = useState([])

  // useEffect para ver cuando cambia el estado
  useEffect(() => {
    console.log('Rendiciones actualizadas:', surrenders)
  }, [surrenders])

  const pushSurrender = (e) => {
    e.preventDefault()

    // Acceder al formulario desde el botón
    const form = e.target.closest('form')
    const body = {
      dateInvoice: form.dateInvoice.value,
      invoiceNumber: form.invoiceNumber.value,
      code: form.code.value,
      description: form.description.value,
      importUSD: parseFloat(form.importUSD.value),
      importBOB: parseFloat(form.importBOB.value),
      idAccountability,
      idUser: user.idUser
    }

    setSurrenders([...surrenders, body])

    // Limpiar el formulario después de agregar
    form.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`${URL}surrender/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(surrenders)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Rendiciones subidas con éxito:', data)
        setAllSurrenders(data)
      })
      .catch((error) => {
        console.error('Error al subir las rendiciones:', error)
      })
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-400'>
      <h1>Crear Rendición de Cuentas</h1>
      <div>
        <strong>ID Rendición de Cuentas:</strong> {idAccountability || 'No definido'}
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label>
          Fecha de Factura:
          <input type='date' name='dateInvoice' required />
        </label>
        <label>
          Número de Factura:
          <input type='text' name='invoiceNumber' required />
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

        <button onClick={pushSurrender}>Agregar Rendición</button>
      </form>

      <section>
        <h2>Rendiciones Agregadas</h2>
        {
          surrenders.map((surrender, index) => (
            <div key={index}>
              <p>Fecha: {surrender.dateInvoice}</p>
              <p>Factura: {surrender.invoiceNumber}</p>
              <p>Código: {surrender.code}</p>
              <p>Descripción: {surrender.description}</p>
              <p>USD: ${surrender.importUSD}</p>
              <p>BOB: Bs {surrender.importBOB}</p>
            </div>
          ))
        }
      </section>

      <button onClick={handleSubmit}>Subir Todas las Rendiciones</button>

      <section>
        <h2>Rendiciones Subidas</h2>
        {
          allSurrenders.map((surrender, index) => (
            <div key={index}>
              <p>ID: {surrender.id_surrender}</p>
              <p>Fecha: {surrender.date_invoice}</p>
              <p>Factura: {surrender.invoice_number}</p>
              <p>Código: {surrender.code}</p>
              <p>Descripción: {surrender.description}</p>
              <p>USD: ${surrender.import_usd}</p>
              <p>BOB: Bs {surrender.import_bob}</p>
            </div>
          ))
        }
      </section>
    </main>
  )
}

export default CreateSurrender
