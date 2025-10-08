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
      <h1>Actualizar Actividades del Proyecto</h1>
      {/* Verificamos que los datos existan y tengan la estructura correcta */}
      {projectActivities.data && projectActivities.data[0] && projectActivities.data[0].list_project_activities_by_project && (
        <div className='w-full max-w-4xl grid grid-cols-3'>
          {projectActivities.data[0].list_project_activities_by_project.map((activity) => (
            <form onSubmit={handleSubmit} key={activity.id_project_activity} className='border p-4 m-2 rounded flex flex-col'>
              <h3>Actividad #{activity.num_project_activity}</h3>
              <label className='display-none'>
                ID Actividad:
                <input
                  type='text'
                  value={activity.id_project_activity}
                  name='idProjectActivity'
                  readOnly
                />
              </label>
              <label>
                Número de actividad:
                <input
                  type='number'
                  name='numProjectActivity'
                  defaultValue={activity.num_project_activity}
                />
              </label>
              <label>
                Descripción:
                <input
                  type='text'
                  defaultValue={activity.project_activity}
                  className='border p-2 rounded'
                  name='description'
                />
              </label>
              <label>
                Rubro/Categoría:
                <input
                  type='text'
                  defaultValue={activity.category}
                  className='border p-2 rounded'
                  name='category'
                />
              </label>
              <button type='submit' className='text-white px-4 py-2 rounded mr-2'>
                Actualizar
              </button>
              <button
                type='button'
                className='bg-red-500 text-white px-4 py-2 rounded'
                onClick={() => handleDelete(activity.id_project_activity)}
              >
                Eliminar
              </button>
            </form>
          ))}
        </div>
      )}
      {(!projectActivities.data || !projectActivities.data[0] || !projectActivities.data[0].list_project_activities_by_project) && (
        <div className='text-center'>
          <h2>No hay actividades disponibles</h2>
          <p>Este proyecto aún no tiene actividades creadas.</p>
        </div>
      )}

      <h2>Agregar nueva actividad</h2>
      <form onSubmit={handleAddSubmit} className='flex flex-col gap-4'>
        <label>
          Número de actividad:
          <input type='number' name='numProjectActivity' min='1' max='10' required />
        </label>
        <label>
          Actividad del proyecto:
          <input type='text' name='projectActivity' required />
        </label>
        <label>
          Rubro/Categoría:
          <input type='text' name='category' required />
        </label>
        <button type='submit'>Agregar</button>
      </form>

      <a href={`/projects/${idProject}`}>Ver proyecto completo</a>
    </main>
  )
}

export default UpdateProjectActivities
