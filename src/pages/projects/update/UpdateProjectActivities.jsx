import Data from '../../../hooks/Data'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const UpdateProjectActivities = () => {
  const user = Authorized()
  const { idProject } = useParams()

  const projectActivitiesLink = idProject ? `projectActivities/project/${idProject}` : null
  const projectActivities = Data(projectActivitiesLink)
  console.log(projectActivities)

  // Función para actualizar actividades existentes
  const handleSubmit = (e) => {
    e.preventDefault()

    const idProjectActivity = e.target.idProjectActivity.value

    const body = {
      numProjectActivity: Number(e.target.numProjectActivity.value),
      projectActivity: e.target.description.value,
      category: e.target.category.value,
      idUser: user.idUser,
      idProject
    }

    fetch(`${URL}projectActivities/${idProjectActivity}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar la actividad')
        }
        return response.json()
      })
      .then(data => {
        console.log('Actividad actualizada:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleDelete = (idProjectActivity) => {
    fetch(`${URL}projectActivities/${idProjectActivity}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar la actividad')
        }
        return response.json()
      })
      .then(data => {
        console.log('Actividad eliminada:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()

    const body = {
      numProjectActivity: Number(e.target.numProjectActivity.value),
      projectActivity: e.target.projectActivity.value,
      category: e.target.category.value,
      idUser: user.idUser,
      idProject
    }

    fetch(`${URL}projectActivities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar la actividad')
        }
        return response.json()
      })
      .then(data => {
        console.log('Actividad agregada:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[900px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
        <h1 className='text-white text-2xl mb-8'>Actualizar Actividades del Proyecto</h1>
        {/* Verificamos que los datos existan y tengan la estructura correcta */}
        {projectActivities.data && projectActivities.data[0] && projectActivities.data[0].list_project_activities_by_project && (
          <div className='w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mb-6'>
            {projectActivities.data[0].list_project_activities_by_project.map((activity) => (
              <form onSubmit={handleSubmit} key={activity.id_project_activity} className='bg-cyan-800 p-4 rounded-lg flex flex-col gap-3'>
                <h3 className='text-cyan-50 text-lg font-semibold'>Actividad #{activity.num_project_activity}</h3>
                <label className='hidden'>
                  <input
                    type='text'
                    value={activity.id_project_activity}
                    name='idProjectActivity'
                    readOnly
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Número de actividad:</p>
                  <input
                    type='number'
                    name='numProjectActivity'
                    defaultValue={activity.num_project_activity}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Descripción:</p>
                  <input
                    type='text'
                    defaultValue={activity.project_activity}
                    name='description'
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Rubro/Categoría:</p>
                  <input
                    type='text'
                    defaultValue={activity.category}
                    name='category'
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
                    onClick={() => handleDelete(activity.id_project_activity)}
                  >
                    Eliminar
                  </button>
                </div>
              </form>
            ))}
          </div>
        )}
        {(!projectActivities.data || !projectActivities.data[0] || !projectActivities.data[0].list_project_activities_by_project) && (
          <div className='text-center mb-6'>
            <h2 className='text-white text-lg mb-2'>No hay actividades disponibles</h2>
            <p className='text-cyan-200'>Este proyecto aún no tiene actividades creadas.</p>
          </div>
        )}

        <h2 className='text-white text-lg mb-4'>Agregar nueva actividad</h2>
        <form onSubmit={handleAddSubmit} className='flex flex-col gap-4 w-3/4 max-w-md'>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Número de actividad:</p>
            <input type='number' name='numProjectActivity' min='1' max='10' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Actividad del proyecto:</p>
            <input type='text' name='projectActivity' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Rubro/Categoría:</p>
            <input type='text' name='category' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Agregar</button>
        </form>

        <a href={`/projects/${idProject}`} className='mt-6 text-cyan-200 hover:text-white'>Ver proyecto completo</a>
      </section>
    </main>
  )
}

export default UpdateProjectActivities
