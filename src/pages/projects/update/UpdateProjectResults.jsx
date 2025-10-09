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
      <section className='flex flex-col justify-center items-center w-[1000px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
        <h1 className='text-white text-2xl mb-8'>Actualizar Resultados Esperados</h1>
        {/* Verificamos que los datos existan y tengan la estructura correcta */}
        {projectResults.data && projectResults.data[0] && projectResults.data[0].list_project_results_by_project && (
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mb-6 text-sm'>
            {projectResults.data[0].list_project_results_by_project.map((result) => (
              <form onSubmit={handleSubmit} key={result.id_project_result} className='bg-cyan-800 p-4 rounded-lg flex flex-col gap-3'>
                <h3 className='text-cyan-50 text-sm font-semibold'>Resultado #{result.num_project_result}</h3>
                <label className='hidden'>
                  <input
                    type='text'
                    value={result.id_project_result}
                    name='idProjectResult'
                    readOnly
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Número de resultado esperado:</p>
                  <input
                    type='number'
                    name='numProjectResult'
                    defaultValue={result.num_project_result}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Descripción:</p>
                  <input
                    type='text'
                    defaultValue={result.project_result}
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
                    onClick={() => handleDelete(result.id_project_result)}
                  >
                    Eliminar
                  </button>
                </div>
              </form>
            ))}
          </div>
        )}
        {(!projectResults.data || !projectResults.data[0] || !projectResults.data[0].list_project_results_by_project) && (
          <div className='text-center mb-6'>
            <h2 className='text-white text-lg mb-2'>No hay resultados disponibles</h2>
            <p className='text-cyan-200'>Este proyecto aún no tiene resultados esperados creados.</p>
          </div>
        )}

        <h2 className='text-white text-lg mb-4'>Agregar nuevo resultado esperado</h2>
        <form onSubmit={handleAddSubmit} className='flex flex-col w-3/4 max-w-md text-sm'>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Número de resultado esperado:</p>
            <input type='number' name='numProjectResult' min='1' max='5' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Resultado esperado:</p>
            <input type='text' name='projectResult' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Agregar</button>
        </form>

        <a href={`/projectActivities/update/${idProject}`} className='mt-6 text-cyan-200 hover:text-white'>Continúa en el paso 4</a>
      </section>
    </main>
  )
}

export default UpdateProjectResults
