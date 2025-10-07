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

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Actualizar Específicos</h1>
      {/* Verificamos que los datos existan y tengan la estructura correcta */}
      {especifics.data && especifics.data[0] && especifics.data[0].list_especifics_by_project && (
        <div className='w-full max-w-4xl grid grid-cols-3'>
          {especifics.data[0].list_especifics_by_project.map((especific) => (
            <form onSubmit={handleSubmit} key={especific.id_especific} className='border p-4 m-2 rounded flex flex-col'>
              <h3>Específico #{especific.num_especific}</h3>
              <label className='display-none'>
                ID Específico:
                <input
                  type='text'
                  value={especific.id_especific}
                  name='idEspecific'
                  readOnly
                />
              </label>
              <label>
                Número de objetivo específico:
                <input
                  type='number'
                  name='numEspecific'
                  defaultValue={especific.num_especific}
                />
              </label>
              <label>
                Descripción:
                <input
                  type='text'
                  defaultValue={especific.especific}
                  className='border p-2 rounded'
                  name='description'
                />
              </label>
              <button type='submit' className='text-white px-4 py-2 rounded mr-2'>
                Editar
              </button>
            </form>
          ))}
        </div>
      )}
      {(!especifics.data || !especifics.data[0] || !especifics.data[0].list_especifics_by_project) && (
        <div className='text-center'>
          <h2>No hay específicos disponibles</h2>
          <p>Este proyecto aún no tiene específicos creados.</p>
        </div>
      )}

      <h2>Agregar nuevo específico</h2>
      <form className='flex flex-col gap-4'>
        <label>
          Número de objetivo específico:
          <input type='number' name='numEspecific' min='1' max='5' required />
        </label>
        <label>
          Objetivo específico:
          <input type='text' name='especific' required />
        </label>
        <button type='submit'>Agregar</button>
      </form>

      <a href={`/projectResults/update/${idProject}`}>Continúa en el paso 3</a>
    </main>
  )
}

export default UpdateEspecifics
