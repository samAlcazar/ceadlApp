import Data from '../../../hooks/Data'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const UpdateProjectResults = () => {
  const user = Authorized()
  const { idProject } = useParams()

  const projectResultsLink = idProject ? `projectResults/project/${idProject}` : null
  const projectResults = Data(projectResultsLink)
  console.log(projectResults)

  // Función para actualizar resultados existentes
  const handleSubmit = (e) => {
    e.preventDefault()

    const idProjectResult = e.target.idProjectResult.value

    const body = {
      numProjectResult: Number(e.target.numProjectResult.value),
      projectResult: e.target.description.value,
      idUser: user.idUser,
      idProject
    }

    fetch(`${URL}projectResults/${idProjectResult}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el resultado')
        }
        return response.json()
      })
      .then(data => {
        console.log('Resultado actualizado:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleDelete = (idProjectResult) => {
    fetch(`${URL}projectResults/${idProjectResult}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el resultado')
        }
        return response.json()
      })
      .then(data => {
        console.log('Resultado eliminado:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()

    const body = {
      numProjectResult: Number(e.target.numProjectResult.value),
      projectResult: e.target.projectResult.value,
      idUser: user.idUser,
      idProject
    }

    fetch(`${URL}projectResults`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar el resultado')
        }
        return response.json()
      })
      .then(data => {
        console.log('Resultado agregado:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Actualizar Resultados Esperados</h1>
      {/* Verificamos que los datos existan y tengan la estructura correcta */}
      {projectResults.data && projectResults.data[0] && projectResults.data[0].list_project_results_by_project && (
        <div className='w-full max-w-4xl grid grid-cols-3'>
          {projectResults.data[0].list_project_results_by_project.map((result) => (
            <form onSubmit={handleSubmit} key={result.id_project_result} className='border p-4 m-2 rounded flex flex-col'>
              <h3>Resultado #{result.num_project_result}</h3>
              <label className='display-none'>
                ID Resultado:
                <input
                  type='text'
                  value={result.id_project_result}
                  name='idProjectResult'
                  readOnly
                />
              </label>
              <label>
                Número de resultado esperado:
                <input
                  type='number'
                  name='numProjectResult'
                  defaultValue={result.num_project_result}
                />
              </label>
              <label>
                Descripción:
                <input
                  type='text'
                  defaultValue={result.project_result}
                  className='border p-2 rounded'
                  name='description'
                />
              </label>
              <button type='submit' className='text-white px-4 py-2 rounded mr-2'>
                Actualizar
              </button>
              <button
                type='button'
                className='bg-red-500 text-white px-4 py-2 rounded'
                onClick={() => handleDelete(result.id_project_result)}
              >
                Eliminar
              </button>
            </form>
          ))}
        </div>
      )}
      {(!projectResults.data || !projectResults.data[0] || !projectResults.data[0].list_project_results_by_project) && (
        <div className='text-center'>
          <h2>No hay resultados disponibles</h2>
          <p>Este proyecto aún no tiene resultados esperados creados.</p>
        </div>
      )}

      <h2>Agregar nuevo resultado esperado</h2>
      <form onSubmit={handleAddSubmit} className='flex flex-col gap-4'>
        <label>
          Número de resultado esperado:
          <input type='number' name='numProjectResult' min='1' max='5' required />
        </label>
        <label>
          Resultado esperado:
          <input type='text' name='projectResult' required />
        </label>
        <button type='submit'>Agregar</button>
      </form>

      <a href={`/projectActivities/update/${idProject}`}>Continúa en el paso 4</a>
    </main>
  )
}

export default UpdateProjectResults
