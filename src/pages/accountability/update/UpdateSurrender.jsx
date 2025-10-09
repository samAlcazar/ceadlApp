import Data from '../../../hooks/Data'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const UpdateSurrender = () => {
  const user = Authorized()
  const { idAccountability } = useParams()

  const surrendersLink = idAccountability ? `surrenders/accountability/${idAccountability}` : null
  const surrenders = Data(surrendersLink)
  console.log(surrenders)

  // Función para actualizar surrenders existentes
  const handleSubmit = (e) => {
    e.preventDefault()

    const idSurrender = e.target.idSurrender.value

    const body = {
      dateInvoice: e.target.dateInvoice.value,
      invoiceNumber: e.target.invoiceNumber.value,
      code: e.target.code.value,
      description: e.target.description.value,
      importUSD: parseFloat(e.target.importUSD.value),
      importBOB: parseFloat(e.target.importBOB.value),
      idUser: user.idUser,
      idAccountability
    }

    fetch(`${URL}surrenders/${idSurrender}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el surrender')
        }
        return response.json()
      })
      .then(data => {
        console.log('Surrender actualizado:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleDelete = (idSurrender) => {
    fetch(`${URL}surrenders/${idSurrender}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el surrender')
        }
        return response.json()
      })
      .then(data => {
        console.log('Surrender eliminado:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()

    const body = {
      dateInvoice: e.target.dateInvoice.value,
      invoiceNumber: e.target.invoiceNumber.value,
      code: e.target.code.value,
      description: e.target.description.value,
      importUSD: parseFloat(e.target.importUSD.value),
      importBOB: parseFloat(e.target.importBOB.value),
      idAccountability,
      idUser: user.idUser
    }

    fetch(`${URL}surrenders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar el surrender')
        }
        return response.json()
      })
      .then(data => {
        console.log('Surrender agregado:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <main className='w-screen h-screen flex flex-col items-center bg-gray-100'>
      <section className='pt-20 pb-6 flex flex-col items-center w-[1000px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
        <h1 className='text-white text-2xl mb-8'>Actualizar items de rendición</h1>
        {/* Verificamos que los datos existan y tengan la estructura correcta */}
        {surrenders.data && surrenders.data[0] && surrenders.data[0].list_surrenders_by_accountability && (
          <div className='w-full grid grid-cols-4 gap-4 px-4 mb-6 text-sm'>
            {surrenders.data[0].list_surrenders_by_accountability.map((surrender, index) => (
              <form onSubmit={handleSubmit} key={surrender.id_surrender} className='bg-cyan-800 p-4 rounded-lg flex flex-col gap-2'>
                <h3 className='text-cyan-50 text-sm font-semibold'>Item {index + 1}</h3>
                <label className='hidden'>
                  <input
                    type='text'
                    value={surrender.id_surrender}
                    name='idSurrender'
                    readOnly
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Fecha Factura:</p>
                  <input
                    type='date'
                    name='dateInvoice'
                    defaultValue={surrender.date_invoice}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 w-[170px]'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Nº Factura:</p>
                  <input
                    type='text'
                    name='invoiceNumber'
                    defaultValue={surrender.invoice_number}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 w-[170px]'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Código:</p>
                  <input
                    type='text'
                    name='code'
                    defaultValue={surrender.code}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 w-[170px]'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Descripción:</p>
                  <input
                    type='text'
                    defaultValue={surrender.description}
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
                      defaultValue={surrender.import_usd}
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
                      defaultValue={surrender.import_bob}
                      className='pl-2 py-1 mt-1 rounded-md bg-cyan-700 w-[60px]'
                    />
                  </label>
                </div>
                <div className=''>
                  <button type='submit' className='w-[80px] mr-1.5 py-1 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white text-sm flex-1'>
                    Actualizar
                  </button>
                  <button
                    type='button'
                    className='w-[80px] py-1 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm flex-1'
                    onClick={() => handleDelete(surrender.id_surrender)}
                  >
                    Eliminar
                  </button>
                </div>
              </form>
            ))}
          </div>
        )}
        {(!surrenders.data || !surrenders.data[0] || !surrenders.data[0].list_surrenders_by_accountability) && (
          <div className='text-center mb-6'>
            <h2 className='text-white text-lg mb-2'>No hay surrenders disponibles</h2>
            <p className='text-cyan-200'>Esta rendición aún no tiene surrenders creados.</p>
          </div>
        )}

        <h2 className='text-white text-lg mb-4'>Agregar nuevo surrender</h2>
        <form onSubmit={handleAddSubmit} className='grid grid-cols-2 gap-2 w-4/5 text-sm'>
          <div className='grid gap-2'>
            <label className='grid text-cyan-50'>
              <p className='text-cyan-50'>Fecha Factura:</p>
              <input type='date' name='dateInvoice' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
            </label>
            <label className='grid text-cyan-50'>
              <p className='text-cyan-50'>Nº Factura:</p>
              <input type='text' name='invoiceNumber' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
            </label>
            <label className='grid text-cyan-50'>
              <p className='text-cyan-50'>Código:</p>
              <input type='text' name='code' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
            </label>
          </div>
          <div>
            <label className='grid text-cyan-50 mb-2'>
              <p className='text-cyan-50'>Descripción:</p>
              <input type='text' name='description' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
            </label>
            <label className='grid text-cyan-50 mb-2'>
              <p className='text-cyan-50'>Importe USD:</p>
              <input type='number' name='importUSD' step='0.01' min='0' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
            </label>
            <label className='grid text-cyan-50'>
              <p className='text-cyan-50'>Importe BOB:</p>
              <input type='number' name='importBOB' step='0.01' min='0' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
            </label>
          </div>
          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white col-span-2'>Agregar</button>
        </form>
        <a href='/accountability/history' className='mt-6 text-cyan-200 hover:text-white'>Finalizar</a>
      </section>
    </main>
  )
}

export default UpdateSurrender
