import Data from '../../../hooks/Data'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const UpdateAccountability = () => {
  const user = Authorized()
  const { idAccountability } = useParams()

  const accountabilityLink = idAccountability ? `accountability/${idAccountability}` : null
  const accountability = Data(accountabilityLink)
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

    fetch(`${URL}accountability/${idAccountability}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar la rendición de cuentas')
        }
        return response.json()
      })
      .then(data => {
        console.log('Rendición de cuentas actualizada:', data)
        window.location.reload()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  if (!idAccountability) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando rendición de cuentas...</h1>
      </main>
    )
  }

  if (accountability.loading) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando datos de la rendición de cuentas...</h1>
      </main>
    )
  }

  if (accountability.error) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Error al cargar rendición de cuentas</h1>
        <p>Error: {accountability.error}</p>
      </main>
    )
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Actualizar Rendición de Cuentas</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Monto (USD):
          <input
            type='number'
            name='amount'
            step='0.01'
            min='0'
            defaultValue={accountability.data?.amount || ''}
            required
          />
        </label>
        <label>
          Fecha de recepción:
          <input
            type='date'
            name='reception'
            defaultValue={accountability.data?.reception || ''}
            required
          />
        </label>
        <label>
          <input
            type='checkbox'
            name='approved'
            defaultChecked={accountability.data?.approved || false}
          />
          Aprobado
        </label>
        <label>
          Proyecto:
          <select name='idProject' defaultValue={accountability.data?.idProject || ''} required>
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
          <select name='idActivity' defaultValue={accountability.data?.idActivity || ''} required>
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
        <button type='submit'>Actualizar Rendición de Cuentas</button>
      </form>

      {accountability.data && (
        <a href={`/surrenders/update/${accountability.data.idActivity || 'default'}`}>
          Continuar al paso 2
        </a>
      )}
    </main>
  )
}

export default UpdateAccountability
