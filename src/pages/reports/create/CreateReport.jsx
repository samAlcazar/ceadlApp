import Authorized from '../../../hooks/Authorized'
import Data from '../../../hooks/Data'
import { URL } from '../../../../utils/url'
import { useState, useEffect } from 'react'

const CreateReport = () => {
  const user = Authorized()
  const [idActivity, setIdActivity] = useState('')
  const [newReport, setNewReport] = useState(null)
  const [selectedProject, setSelectedProject] = useState('')
  const [projectActivities, setProjectActivities] = useState([])

  const projects = Data('projects')

  // Efecto para cargar actividades cuando se selecciona un proyecto
  useEffect(() => {
    if (selectedProject) {
      fetch(`${URL}activities/project/${selectedProject}`)
        .then(response => response.json())
        .then(data => {
          setProjectActivities(data[0]?.list_activities_by_project || [])
        })
        .catch(error => {
          console.error('Error cargando actividades del proyecto:', error)
          setProjectActivities([])
        })
    } else {
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
      issues: e.target.issues.value,
      results: e.target.results.value,
      obstacle: e.target.obstacle.value,
      conclusions: e.target.conclusions.value,
      anexos: e.target.anexos.value,
      approved: false,
      idProject: e.target.idProject.value,
      idActivity: e.target.idActivity.value,
      idUser: user.idUser
    }

    fetch(`${URL}reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al crear el reporte')
        }
        return response.json()
      })
      .then(data => {
        setNewReport(data)
        setIdActivity(e.target.idActivity.value)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[900px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
        <h1 className='text-white text-2xl mb-8'>Crear Informe</h1>

        <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4 w-4/5 py-4'>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Temas tratados:</p>
            <textarea name='issues' rows='3' placeholder='Describe los temas tratados' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 placeholder-cyan-300' />
          </label>

          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Resultados obtenidos:</p>
            <textarea name='results' rows='3' placeholder='Describe los resultados alcanzados' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 placeholder-cyan-300' />
          </label>

          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Obstáculos:</p>
            <textarea name='obstacle' rows='3' placeholder='Describe los obstáculos enfrentados' className='px-2 py-1 mt-2 rounded-md bg-cyan-700 placeholder-cyan-300' />
          </label>

          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Conclusiones:</p>
            <textarea name='conclusions' rows='3' placeholder='Conclusiones del reporte' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 placeholder-cyan-300' />
          </label>

          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Anexos:</p>
            <textarea name='anexos' rows='3' placeholder='Documentos adjuntos o referencias' className='px-2 py-1 mt-2 rounded-md bg-cyan-700 placeholder-cyan-300' />
          </label>

          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Proyecto:</p>
            <select name='idProject' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white' onChange={handleProjectChange} value={selectedProject}>
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
            <select name='idActivity' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white' disabled={!selectedProject}>
              <option value=''>Seleccionar actividad</option>
              {projectActivities.map((activity) => (
                <option key={activity.id_activity} value={activity.id_activity}>
                  {activity.activity}
                </option>
              ))}
            </select>
          </label>

          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Crear Informe</button>
        </form>
        <section className='mt-4 w-3/4'>
          <p className='text-center text-cyan-50'>{newReport ? 'El informe se ha creado con éxito' : 'Aún no se ha creado el informe'}</p>
          <a href={`/quantitative/create/${idActivity}`} className='mt-4 text-cyan-200 hover:text-white' style={{ display: newReport !== null ? 'block' : 'none' }}>Continúa en el paso 2</a>
        </section>
      </section>
    </main>
  )
}

export default CreateReport
