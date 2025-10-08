import Data from '../../../hooks/Data'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const UpdateApplication = () => {
  const user = Authorized()
  const { idApplication } = useParams()

  const applicationLink = idApplication ? `applications/${idApplication}` : null
  const application = Data(applicationLink)
  const projects = Data('projects')
  const activities = Data('activities')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!user || !user.idUser) {
      console.error('Usuario no autenticado')
      return
    }

    const body = {
      amount: parseFloat(e.target.amount.value),
      approved: e.target.approved.checked,
      idProject: e.target.idProject.value,
      idActivity: e.target.idActivity.value,
      idUser: user.idUser
    }

    fetch(`${URL}applications/${idApplication}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar la aplicación')
        }
        return response.json()
      })
      .then(data => {
        console.log('Aplicación actualizada:', data)
        window.location.reload()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  if (!idApplication) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando aplicación...</h1>
      </main>
    )
  }

  if (application.loading) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando datos de la aplicación...</h1>
      </main>
    )
  }

  if (application.error) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Error al cargar aplicación</h1>
        <p>Error: {application.error}</p>
      </main>
    )
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Actualizar Aplicación</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Monto (USD):
          <input
            type='number'
            name='amount'
            step='0.01'
            min='0'
            defaultValue={application.data?.amount || ''}
            required
          />
        </label>

        <label>
          <input
            type='checkbox'
            name='approved'
            defaultChecked={application.data?.approved || false}
          />
          Aprobado
        </label>
        <label>
          Proyecto:
          <select name='idProject' defaultValue={application.data?.idProject || ''} required>
            <option value=''>Seleccionar proyecto</option>
            {projects.data && projects.data[0] && projects.data[0].list_projects
              ? projects.data[0].list_projects.map((project) => (
                <option key={project.id_project} value={project.id_project}>
                  {project.name_project}
                </option>
              ))
              : null}
          </select>
        </label>
        <label>
          Actividad:
          <select name='idActivity' defaultValue={application.data?.idActivity || ''} required>
            <option value=''>Seleccionar actividad</option>
            {activities.data && activities.data[0] && activities.data[0].list_activities
              ? activities.data[0].list_activities.map((activity) => (
                <option key={activity.id_activity} value={activity.id_activity}>
                  {activity.activity}
                </option>
              ))
              : null}
          </select>
        </label>
        <button type='submit'>Actualizar Aplicación</button>
      </form>

      {application.data && (
        <a href={`/budgets/update/${application.data.idActivity || 'default'}`}>
          Continuar al paso 2
        </a>
      )}
    </main>
  )
}

export default UpdateApplication
