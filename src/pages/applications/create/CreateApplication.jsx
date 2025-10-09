import Authorized from '../../../hooks/Authorized'
import Data from '../../../hooks/Data'
import { URL } from '../../../../utils/url'
import { useState, useEffect } from 'react'

const CreateApplication = () => {
  const user = Authorized()
  const projects = Data('projects')
  const activities = Data('activities')

  const [idApplication, setIdApplication] = useState('')
  const [newApplication, setNewApplication] = useState(null)
  const [selectedProject, setSelectedProject] = useState('')
  const [filteredActivities, setFilteredActivities] = useState([])

  useEffect(() => {
    if (selectedProject && activities.data && activities.data[0] && activities.data[0].list_activities) {
      const filtered = activities.data[0].list_activities.filter(
        activity => activity.id_project.toString() === selectedProject
      )
      setFilteredActivities(filtered)
    } else {
      setFilteredActivities([])
    }
  }, [selectedProject, activities.data])

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value)
  }

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

    fetch(`${URL}applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al crear la aplicación')
        }
        return response.json()
      })
      .then(data => {
        console.log('Aplicación creada:', data)
        setNewApplication(data)
        setIdApplication(data.create_application.id_application)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[600px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
        <h1 className='text-white text-2xl mb-8'>Crear Solicitud</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-3/4 py-4'>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Monto (USD):</p>
            <input
              type='number'
              name='amount'
              step='0.01'
              min='0'
              placeholder='0.00'
              required
              className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white placeholder-cyan-300'
            />
          </label>

          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Proyecto:</p>
            <select
              name='idProject'
              required
              className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white'
              onChange={handleProjectChange}
              value={selectedProject}
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
            <select name='idActivity' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white'>
              <option value=''>Seleccionar actividad</option>
              {filteredActivities.map((activity) => (
                <option key={activity.id_activity} value={activity.id_activity}>
                  {activity.activity}
                </option>
              ))}
            </select>
          </label>

          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Crear Solicitud</button>
        </form>

        <section className='mt-4 w-3/4'>
          <p className='text-center text-cyan-50'>{newApplication !== null ? 'La solicitud se ha creado con éxito' : 'Aún no se ha creado la solicitud'}</p>
          <a href={`/budgets/create/${idApplication}`} className='mt-4 text-cyan-200 hover:text-white' style={{ display: newApplication !== null ? 'block' : 'none' }}>Continúa en el paso 2</a>
        </section>
      </section>
    </main>
  )
}

export default CreateApplication
