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
        <h1>Cargando reporte...</h1>
      </main>
    )
  }

  // Show loading state
  if (report.loading) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando datos del reporte...</h1>
      </main>
    )
  }

  // Show error state
  if (report.error) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Error al cargar reporte</h1>
        <p>Error: {report.error}</p>
      </main>
    )
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Actualizar Reporte</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label>
          Temas tratados:
          <textarea
            name='issues'
            rows='3'
            placeholder='Describe los Temas tratados'
            defaultValue={report.data?.read_report.issues || ''}
          />
        </label>

        <label>
          Resultados obtenidos:
          <textarea
            name='results'
            rows='3'
            placeholder='Describe los resultados alcanzados'
            defaultValue={report.data?.read_report.results || ''}
          />
        </label>

        <label>
          Obstáculos:
          <textarea
            name='obstacle'
            rows='3'
            placeholder='Describe los obstáculos enfrentados'
            defaultValue={report.data?.read_report.obstacle || ''}
          />
        </label>

        <label>
          Conclusiones:
          <textarea
            name='conclusions'
            rows='3'
            placeholder='Conclusiones del reporte'
            defaultValue={report.data?.read_report.conclusions || ''}
          />
        </label>

        <label>
          Anexos:
          <textarea
            name='anexos'
            rows='2'
            placeholder='Documentos adjuntos o referencias'
            defaultValue={report.data?.read_report.anexos || ''}
          />
        </label>

        <label>
          Proyecto:
          <select name='idProject' defaultValue={report.data?.idProject || ''}>
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
          <select name='idActivity' defaultValue={report.data?.idActivity || ''}>
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
        <button type='submit'>Actualizar Reporte</button>
      </form>

      {report.data && (
        <a href={`/quantitative/update/${report.data.read_report?.id_activity || 'default'}`}>
          Continuar al paso 2
        </a>
      )}
    </main>
  )
}

export default UpdateReport
