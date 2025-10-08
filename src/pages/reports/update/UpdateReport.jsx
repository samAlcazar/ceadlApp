import Data from '../../../hooks/Data'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const UpdateReport = () => {
  const user = Authorized()
  const { idReport } = useParams()

  const reportLink = idReport ? `reports/${idReport}` : null
  const report = Data(reportLink)

  const projectsLink = idReport ? 'projects' : null
  const projects = Data(projectsLink)

  const activitiesLink = idReport ? 'activities' : null
  const activities = Data(activitiesLink)

  // Solo mostrar en console cuando los datos están listos
  if (report.data && !report.loading) {
    console.log('Datos del reporte cargados:', report.data)
    console.log('Estructura completa:', JSON.stringify(report.data, null, 2))
  }

  // Función para actualizar reporte existente
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

    fetch(`${URL}reports/${idReport}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el reporte')
        }
        return response.json()
      })
      .then(data => {
        console.log('Reporte actualizado:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  // Don't render if idReport is not available yet
  if (!idReport) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <section className='flex flex-col justify-center items-center w-[500px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700'>
          <h1 className='text-white text-2xl'>Cargando reporte...</h1>
        </section>
      </main>
    )
  }

  // Show loading state
  if (report.loading) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <section className='flex flex-col justify-center items-center w-[500px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700'>
          <h1 className='text-white text-2xl'>Cargando datos del reporte...</h1>
        </section>
      </main>
    )
  }

  // Show error state
  if (report.error) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <section className='flex flex-col justify-center items-center w-[500px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700'>
          <h1 className='text-white text-2xl mb-4'>Error al cargar reporte</h1>
          <p className='text-cyan-200'>Error: {report.error}</p>
        </section>
      </main>
    )
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[600px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
        <h1 className='text-white text-2xl mb-8'>Actualizar Reporte</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-3/4 py-4'>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Temas tratados:</p>
            <textarea
              name='issues'
              rows='3'
              placeholder='Describe los Temas tratados'
              defaultValue={report.data?.read_report.issues || ''}
              className='px-2 py-1 mt-2 rounded-md bg-cyan-700 placeholder-cyan-300'
            />
          </label>

          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Resultados obtenidos:</p>
            <textarea
              name='results'
              rows='3'
              placeholder='Describe los resultados alcanzados'
              defaultValue={report.data?.read_report.results || ''}
              className='px-2 py-1 mt-2 rounded-md bg-cyan-700 placeholder-cyan-300'
            />
          </label>

          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Obstáculos:</p>
            <textarea
              name='obstacle'
              rows='3'
              placeholder='Describe los obstáculos enfrentados'
              defaultValue={report.data?.read_report.obstacle || ''}
              className='px-2 py-1 mt-2 rounded-md bg-cyan-700 placeholder-cyan-300'
            />
          </label>

          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Conclusiones:</p>
            <textarea
              name='conclusions'
              rows='3'
              placeholder='Conclusiones del reporte'
              defaultValue={report.data?.read_report.conclusions || ''}
              className='px-2 py-1 mt-2 rounded-md bg-cyan-700 placeholder-cyan-300'
            />
          </label>

          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Anexos:</p>
            <textarea
              name='anexos'
              rows='2'
              placeholder='Documentos adjuntos o referencias'
              defaultValue={report.data?.read_report.anexos || ''}
              className='px-2 py-1 mt-2 rounded-md bg-cyan-700 placeholder-cyan-300'
            />
          </label>

          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Proyecto:</p>
            <select name='idProject' defaultValue={report.data?.idProject || ''} className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white'>
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
            <select name='idActivity' defaultValue={report.data?.idActivity || ''} className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white'>
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
          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Actualizar Reporte</button>
        </form>

        {report.data && (
          <a href={`/quantitative/update/${report.data.read_report?.id_activity || 'default'}`} className='mt-4 text-cyan-200 hover:text-white'>
            Continuar al paso 2
          </a>
        )}
      </section>
    </main>
  )
}

export default UpdateReport
