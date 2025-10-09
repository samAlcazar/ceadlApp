import { useState } from 'react'
import Authorized from '../../hooks/Authorized'
import { URL } from '../../../utils/url'

const CreateFounder = () => {
  const user = Authorized()
  const [founder, setFounder] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const body = {
      codFounder: e.target.codFounder.value,
      nameFounder: e.target.nameFounder.value,
      idUser: user.idUser
    }

    fetch(`${URL}founders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al crear el fundador')
        }
        return response.json()
      })
      .then((data) => {
        setFounder(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[1200px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
        <h1 className='text-white text-2xl mb-8'>Crear Fundador</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-full px-8 py-4'>
          <div className='grid grid-cols-1 lg:grid-cols-1 gap-6'>
            <fieldset className='border border-cyan-300 rounded-lg p-4'>
              <legend className='text-cyan-50 px-2'>Datos del Fundador</legend>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Código del Fundador:</p>
                  <input
                    type='text'
                    name='codFounder'
                    required
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white'
                    placeholder='Ej: FND123'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Nombre del Fundador:</p>
                  <input
                    type='text'
                    name='nameFounder'
                    required
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white'
                    placeholder='Ej: Alice Smith'
                  />
                </label>
              </div>
            </fieldset>
          </div>
          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white w-full'>
            Crear Fundador
          </button>
        </form>
        <section className='mt-4 w-3/4'>
          <p className='text-center text-cyan-50'>
            {founder !== null ? 'El fundador se ha creado con éxito' : 'Aún no se ha creado el fundador'}
          </p>
          <div className='text-center mt-4' style={{ display: founder !== null ? 'block' : 'none' }}>
            <a href='/founders/history' className='text-cyan-200 hover:text-white'>Ver todos los fundadores</a>
          </div>
        </section>
      </section>
    </main>
  )
}

export default CreateFounder
