import Data from '../../../hooks/Data'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const UpdateEspecifics = () => {
  const user = Authorized()
  const { idProject } = useParams()

  const especificsLink = idProject ? `especifics/project/${idProject}` : null
  const especifics = Data(especificsLink)
  console.log(especifics)

  // Función para actualizar específicos existentes
  const handleSubmit = (e) => {
    e.preventDefault()

    const idEspecific = e.target.idEspecific.value

    const body = {
      numEspecific: Number(e.target.numEspecific.value),
      especific: e.target.description.value,
      idUser: user.idUser,
      idProject
    }

    fetch(`${URL}especifics/${idEspecific}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el específico')
        }
        return response.json()
      })
      .then(data => {
        console.log('Específico actualizado:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleDelete = (idEspecific) => {
    fetch(`${URL}especifics/${idEspecific}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el específico')
        }
        return response.json()
      })
      .then(data => {
        console.log('Específico eliminado:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()

    const body = {
      numEspecific: Number(e.target.numEspecific.value),
      especific: e.target.especific.value,
      idUser: user.idUser,
      idProject
    }

    fetch(`${URL}especifics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar el específico')
        }
        return response.json()
      })
      .then(data => {
        console.log('Específico agregado:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[1000px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
        <h1 className='text-white text-2xl mb-8'>Actualizar Específicos</h1>
        {/* Verificamos que los datos existan y tengan la estructura correcta */}
        {especifics.data && especifics.data[0] && especifics.data[0].list_especifics_by_project && (
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mb-6 text-sm'>
            {especifics.data[0].list_especifics_by_project.map((especific) => (
              <form onSubmit={handleSubmit} key={especific.id_especific} className='bg-cyan-800 p-4 rounded-lg flex flex-col gap-3'>
                <h3 className='text-cyan-50 text-sm font-semibold'>Específico #{especific.num_especific}</h3>
                <label className='hidden'>
                  <input
                    type='text'
                    value={especific.id_especific}
                    name='idEspecific'
                    readOnly
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Número de objetivo específico:</p>
                  <input
                    type='number'
                    name='numEspecific'
                    defaultValue={especific.num_especific}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Descripción:</p>
                  <input
                    type='text'
                    defaultValue={especific.especific}
                    name='description'
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700'
                  />
                </label>
                <div className='flex gap-2 mt-2'>
                  <button type='submit' className='px-3 py-1 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white text-sm flex-1'>
                    Actualizar
                  </button>
                  <button
                    type='button'
                    className='px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm flex-1'
                    onClick={() => handleDelete(especific.id_especific)}
                  >
                    Eliminar
                  </button>
                </div>
              </form>
            ))}
          </div>
        )}
        {(!especifics.data || !especifics.data[0] || !especifics.data[0].list_especifics_by_project) && (
          <div className='text-center mb-6'>
            <h2 className='text-white text-lg mb-2'>No hay específicos disponibles</h2>
            <p className='text-cyan-200'>Este proyecto aún no tiene específicos creados.</p>
          </div>
        )}

        <h2 className='text-white text-lg mb-4'>Agregar nuevo específico</h2>
        <form onSubmit={handleAddSubmit} className='flex flex-col w-3/4 max-w-md text-sm'>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Número de objetivo específico:</p>
            <input type='number' name='numEspecific' min='1' max='5' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Objetivo específico:</p>
            <input type='text' name='especific' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Agregar</button>
        </form>
        <a href={`/projectResults/update/${idProject}`} className='mt-6 text-cyan-200 hover:text-white'>Continúa en el paso 3</a>
      </section>
    </main>
  )
}

export default UpdateEspecifics
