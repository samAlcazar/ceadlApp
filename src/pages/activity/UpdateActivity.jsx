import Data from '../../hooks/Data'
import Authorized from '../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../utils/url'
import { useState, useEffect } from 'react'

const UpdateActivity = () => {
  const user = Authorized()
  const { idActivity } = useParams()
  const [newActivity, setNewActivity] = useState(null)
  const [selectedProject, setSelectedProject] = useState('')
  const [especifics, setEspecifics] = useState([])
  const [projectResults, setProjectResults] = useState([])
  const [projectActivities, setProjectActivities] = useState([])

  const activityLink = idActivity ? `activities/${idActivity}` : null
  const projectsLink = 'projects'

  const activity = Data(activityLink)
  const projects = Data(projectsLink)

  // Cargar el proyecto seleccionado cuando se carga la actividad
  useEffect(() => {
    if (activity.data?.read_activity?.id_project) {
      setSelectedProject(activity.data.read_activity.id_project)
    }
  }, [activity.data])

  // Efecto para cargar datos cuando se selecciona un proyecto
  useEffect(() => {
    if (selectedProject) {
      // Cargar específicos del proyecto
      fetch(`${URL}especifics/project/${selectedProject}`)
        .then(response => response.json())
        .then(data => {
          setEspecifics(data[0]?.list_especifics_by_project || [])
        })
        .catch(error => console.error('Error cargando específicos:', error))

      // Cargar resultados esperados del proyecto
      fetch(`${URL}projectResults/project/${selectedProject}`)
        .then(response => response.json())
        .then(data => {
          setProjectResults(data[0]?.list_project_results_by_project || [])
        })
        .catch(error => console.error('Error cargando resultados:', error))

      // Cargar actividades del proyecto
      fetch(`${URL}projectActivities/project/${selectedProject}`)
        .then(response => response.json())
        .then(data => {
          setProjectActivities(data[0]?.list_project_activities_by_project || [])
        })
        .catch(error => console.error('Error cargando actividades:', error))
    } else {
      // Limpiar datos si no hay proyecto seleccionado
      setEspecifics([])
      setProjectResults([])
      setProjectActivities([])
    }
  }, [selectedProject])

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
      activity: e.target.activity.value,
      dateStart: e.target.dateStart.value,
      dateEnd: e.target.dateEnd.value,
      place: e.target.place.value,
      participantsExpected: parseInt(e.target.participantsExpected.value),
      objetive: e.target.objetive.value,
      resultExpected: e.target.resultExpected.value,
      descriptionActivity: e.target.descriptionActivity.value,
      idProject: e.target.idProject.value,
      idEspecific: e.target.idEspecific.value,
      idProjectResult: e.target.idProjectResult.value,
      idProjectActivity: e.target.idProjectActivity.value,
      idUser: user.idUser
    }

    fetch(`${URL}activities/${idActivity}`, {
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
        setNewActivity(data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const projectsList = projects.data ? projects.data[0].list_projects : []

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[1200px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
        <h1 className='text-white text-2xl mb-8'>Actualizar Actividad</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-full px-8 py-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <fieldset className='border border-cyan-300 rounded-lg p-4'>
              <legend className='text-cyan-50 px-2'>Datos de la Actividad</legend>
              <div className='grid grid-cols-2 gap-4'>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Actividad:</p>
                  <input
                    type='text'
                    name='activity'
                    defaultValue={activity.data?.read_activity?.activity || ''}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Fecha de inicio:</p>
                  <input
                    type='date'
                    name='dateStart'
                    defaultValue={activity.data?.read_activity?.date_start || ''}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Fecha de fin:</p>
                  <input
                    type='date'
                    name='dateEnd'
                    defaultValue={activity.data?.read_activity?.date_end || ''}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Lugar:</p>
                  <input
                    type='text'
                    name='place'
                    defaultValue={activity.data?.read_activity?.place || ''}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Participantes esperados:</p>
                  <input
                    type='number'
                    name='participantsExpected'
                    min='1'
                    defaultValue={activity.data?.read_activity?.participants_expected || ''}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Objetivo de la actividad:</p>
                  <textarea
                    name='objetive'
                    defaultValue={activity.data?.read_activity?.objetive || ''}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 h-20'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Resultado esperado de la actividad:</p>
                  <textarea
                    name='resultExpected'
                    defaultValue={activity.data?.read_activity?.result_expected || ''}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 h-20'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Descripción de la actividad:</p>
                  <textarea
                    name='descriptionActivity'
                    defaultValue={activity.data?.read_activity?.description_activity || ''}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 h-20'
                  />
                </label>
              </div>
            </fieldset>
            <fieldset className='border border-cyan-300 rounded-lg p-4'>
              <legend className='text-cyan-50 px-2'>Datos del Proyecto</legend>
              <div className='flex flex-col gap-4'>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Proyecto:</p>
                  <select
                    name='idProject'
                    required
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white'
                    onChange={handleProjectChange}
                    value={selectedProject}
                  >
                    <option value=''>Seleccionar proyecto</option>
                    {projectsList && projectsList.map((project) => (
                      <option key={project.id_project} value={project.id_project}>
                        {project.name_project}
                      </option>
                    ))}
                  </select>
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Objetivo específico del proyecto:</p>
                  <select
                    name='idEspecific'
                    required
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white'
                    disabled={!selectedProject}
                    defaultValue={activity.data?.read_activity?.id_especific || ''}
                  >
                    <option value=''>Seleccionar objetivo específico</option>
                    {especifics.map((especific) => (
                      <option key={especific.id_especific} value={especific.id_especific}>
                        {especific.num_especific}. {especific.especific}
                      </option>
                    ))}
                  </select>
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Resultado esperado del proyecto:</p>
                  <select
                    name='idProjectResult'
                    required
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white'
                    disabled={!selectedProject}
                    defaultValue={activity.data?.read_activity?.id_project_result || ''}
                  >
                    <option value=''>Seleccionar resultado esperado</option>
                    {projectResults.map((result) => (
                      <option key={result.id_project_result} value={result.id_project_result}>
                        {result.num_project_result}. {result.project_result}
                      </option>
                    ))}
                  </select>
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Actividad del proyecto:</p>
                  <select
                    name='idProjectActivity'
                    required
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white'
                    disabled={!selectedProject}
                    defaultValue={activity.data?.read_activity?.id_project_activity || ''}
                  >
                    <option value=''>Seleccionar actividad del proyecto</option>
                    {projectActivities.map((projectActivity) => (
                      <option key={projectActivity.id_project_activity} value={projectActivity.id_project_activity}>
                        {projectActivity.num_project_activity}. {projectActivity.project_activity}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </fieldset>
          </div>
          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white w-full'>Actualizar Actividad</button>
        </form>
        <section className='mt-4 w-3/4'>
          <p className='text-center text-cyan-50'>{newActivity ? 'La actividad se ha actualizado con éxito' : 'Aún no se ha actualizado la actividad'}</p>
          <div className='text-center mt-4' style={{ display: newActivity ? 'block' : 'none' }}>
            <a href='/activities/history' className='text-cyan-200 hover:text-white'>Ver todas las actividades</a>
          </div>
        </section>
      </section>
    </main>
  )
}

export default UpdateActivity
