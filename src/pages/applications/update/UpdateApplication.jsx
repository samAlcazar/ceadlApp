import Data from '../../../hooks/Data'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'
import { useState } from 'react'

const UpdateApplication = () => {
  const user = Authorized()
  const { idApplication } = useParams()
  const [updateApplication, setUpdateApplication] = useState(null)

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
      approved: false,
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
        setUpdateApplication(data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  if (!idApplication) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <section className='flex flex-col justify-center items-center w-[600px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700'>
          <h1 className='text-white text-2xl'>Cargando aplicación...</h1>
        </section>
      </main>
    )
  }

  if (application.loading) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <section className='flex flex-col justify-center items-center w-[600px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700'>
          <h1 className='text-white text-2xl'>Cargando datos de la aplicación...</h1>
        </section>
      </main>
    )
  }

  if (application.error) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <section className='flex flex-col justify-center items-center w-[600px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700'>
          <h1 className='text-white text-2xl mb-4'>Error al cargar aplicación</h1>
          <p className='text-cyan-200'>Error: {application.error}</p>
        </section>
      </main>
    )
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[600px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
        <h1 className='text-white text-2xl mb-8'>Actualizar Aplicación</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-3/4 py-4'>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Monto (USD):</p>
            <input
              type='number'
              name='amount'
              step='0.01'
              min='0'
              defaultValue={application.data?.read_application.amount || ''}
              required
              className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white placeholder-cyan-300'
            />
          </label>

          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Proyecto:</p>
            <select
              name='idProject'
              defaultValue={application.data?.idProject || ''}
              required
              className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white'
            >
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

          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Actividad:</p>
            <select
              name='idActivity'
              defaultValue={application.data?.idActivity || ''}
              required
              className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white'
            >
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

          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>
            Actualizar Aplicación
          </button>
        </form>

        <section className='mt-4 w-3/4'>
          <p>{updateApplication !== null ? 'Solicitud actualizada con éxito' : 'Aún no se ha actualizado la solicitud'}</p>
          <a href={`/budgets/update/${idApplication}`} style={{ display: updateApplication !== null ? 'block' : 'none' }}>Continua al paso 2</a>
        </section>
      </section>
    </main>
  )
}

export default UpdateApplication
