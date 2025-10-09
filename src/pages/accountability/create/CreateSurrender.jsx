import { useState, useEffect } from 'react'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

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

  const removeSurrender = (index) => {
    const updatedSurrenders = surrenders.filter((_, i) => i !== index)
    setSurrenders(updatedSurrenders)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`${URL}surrenders/bulk`, {
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
    <main className='w-screen h-screen flex flex-col items-center bg-gray-100'>
      <section className='flex flex-col items-center w-[1000px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto px-6 pt-20 pb-8'>
        <h1 className='text-white text-2xl mb-8'>Crear Surrender</h1>

        <form className='grid grid-cols-2 gap-2 w-4/5 bg-cyan-800 p-6 rounded-lg text-sm'>
          <div className=''>
            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50 mb-2'>Fecha de Factura:</p>
              <input
                type='date'
                name='dateInvoice'
                required
                className='px-2 py-1 rounded-md bg-cyan-700 text-white placeholder-cyan-300'
              />
            </label>

            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50 mb-2'>Número de Factura:</p>
              <input
                type='text'
                name='invoiceNumber'
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
          </div>
          <div className=''>
            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50 mb-2'>Descripción:</p>
              <input
                type='text'
                name='description'
                required
                className='px-2 py-1 rounded-md bg-cyan-700 text-white placeholder-cyan-300'
              />
            </label>

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
          </div>

          <button
            type='button'
            onClick={pushSurrender}
            className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white col-span-2'
          >
            Agregar Surrender
          </button>
        </form>

        {surrenders.length > 0 && (
          <section className='mt-6 w-4/5'>
            <h2 className='text-white text-lg mb-4'>Surrenders Agregados</h2>
            <div className='space-y-3 grid grid-cols-2 gap-4'>
              {surrenders.map((surrender, index) => (
                <div key={index} className='bg-cyan-800 p-4 rounded-lg'>
                  <div className='text-cyan-50 space-y-1 grid grid-cols-2 gap-4'>
                    <div>
                      <p><span className='font-semibold'>Fecha:</span> {surrender.dateInvoice}</p>
                      <p><span className='font-semibold'>Factura:</span> {surrender.invoiceNumber}</p>
                      <p><span className='font-semibold'>Código:</span> {surrender.code}</p>
                    </div>
                    <div>
                      <p><span className='font-semibold'>Descripción:</span> {surrender.description}</p>
                      <p><span className='font-semibold'>USD:</span> {surrender.importUSD}</p>
                      <p><span className='font-semibold'>BOB:</span> {surrender.importBOB}</p>
                    </div>
                  </div>
                  <button
                    type='button'
                    onClick={() => removeSurrender(index)}
                    className='mt-4 px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white'
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {surrenders.length > 0 && (
          <button
            onClick={handleSubmit}
            className='mt-6 px-6 py-3 rounded-md bg-green-600 hover:bg-green-500 text-white font-semibold'
          >
            Subir Todos los Surrenders
          </button>
        )}

        {allSurrenders.length > 0 && (
          <section className='mt-6 w-full max-w-md'>
            <h2 className='text-white text-lg mb-4'>Surrenders Subidos</h2>
            <a href='/accountability/history' className='text-cyan-50 underline '>Finalizar</a>
          </section>
        )}
      </section>
    </main>
  )
}

export default CreateSurrender
