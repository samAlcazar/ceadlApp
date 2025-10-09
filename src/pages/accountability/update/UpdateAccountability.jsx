import Data from '../../../hooks/Data'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'
import { useState } from 'react'

const UpdateAccountability = () => {
  const user = Authorized()
  const { idAccountability } = useParams()
  const [accountabilityUpdated, setAccountabilityUpdated] = useState(null)

  const accountabilityLink = idAccountability ? `accountabilities/${idAccountability}` : null
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
      approved: false,
      idProject: e.target.idProject.value,
      idActivity: e.target.idActivity.value,
      idUser: user.idUser
    }

    fetch(`${URL}accountabilities/${idAccountability}`, {
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
        setAccountabilityUpdated(data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  if (!idAccountability) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <section className='flex flex-col justify-center items-center w-[600px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
          <h1 className='text-white text-2xl mb-8'>Cargando rendición de cuentas...</h1>
        </section>
      </main>
    )
  }

  if (accountability.loading) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <section className='flex flex-col justify-center items-center w-[600px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
          <h1 className='text-white text-2xl mb-8'>Cargando datos de la rendición de cuentas...</h1>
        </section>
      </main>
    )
  }

  if (accountability.error) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <section className='flex flex-col justify-center items-center w-[600px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
          <h1 className='text-white text-2xl mb-8'>Error al cargar rendición de cuentas</h1>
          <p className='text-red-300'>Error: {accountability.error}</p>
        </section>
      </main>
    )
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[600px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
        <h1 className='text-white text-2xl mb-8'>Actualizar Rendición de Cuentas</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-3/4 py-4'>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Monto (USD):</p>
            <input
              type='number'
              name='amount'
              step='0.01'
              min='0'
              defaultValue={accountability.data?.read_accountability.amount || ''}
              required
              className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white placeholder-cyan-300'
            />
          </label>

          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Fecha de recepción:</p>
            <input
              type='date'
              name='reception'
              defaultValue={accountability.data?.read_accountability.reception || ''}
              required
              className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white'
            />
          </label>

          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Proyecto:</p>
            <select
              name='idProject'
              defaultValue={accountability.data?.read_accountability.idProject || ''}
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
              defaultValue={accountability.data?.read_accountability.idActivity || ''}
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
            Actualizar Rendición de Cuentas
          </button>
        </form>

        {accountabilityUpdated && (
          <section className='mt-4 w-3/4'>
            <p className='text-center text-cyan-50 mb-4'>Rendición de cuentas actualizada con éxito</p>
            <a
              href={`/surrenders/update/${idAccountability}`}
              className='mt-4 text-cyan-200 hover:text-white block text-center'
            >
              Continuar al paso 2
            </a>
          </section>
        )}
      </section>
    </main>
  )
}

export default UpdateAccountability
