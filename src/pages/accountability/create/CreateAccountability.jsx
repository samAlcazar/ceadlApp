import Authorized from '../../../hooks/Authorized'
import Data from '../../../hooks/Data'
import { URL } from '../../../../utils/url'

const CreateAccountability = () => {
  const user = Authorized()
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
      reception: e.target.reception.value,
      approved: e.target.approved.checked,
      idProject: e.target.idProject.value,
      idActivity: e.target.idActivity.value,
      idUser: user.idUser
    }

    fetch(`${URL}accountability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al crear la rendición de cuentas')
        }
        return response.json()
      })
      .then(data => {
        console.log('Rendición de cuentas creada:', data)
        const activityId = e.target.idActivity.value
        if (activityId) {
          window.location.href = `/surrenders/create/${activityId}`
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Crear Rendición de Cuentas</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Monto (USD):
          <input type='number' name='amount' step='0.01' min='0' placeholder='0.00' required />
        </label>
        <label>
          Fecha de recepción:
          <input type='date' name='reception' required />
        </label>
        <label>
          <input type='checkbox' name='approved' />
          Aprobado
        </label>
        <label>
          Proyecto:
          <select name='idProject' required>
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
          <select name='idActivity' required>
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
        <button type='submit'>Crear Rendición de Cuentas</button>
      </form>
      <a href='/surrenders/create/cc7a695b-f1dd-4ad8-9701-62e79f37295c'>
        Ir al paso 2 - Crear Surrender
      </a>
    </main>
  )
}

export default CreateAccountability
