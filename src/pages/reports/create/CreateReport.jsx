import Authorized from '../../../hooks/Authorized'
import Data from '../../../hooks/Data'
import { URL } from '../../../../utils/url'
import { useState } from 'react'

const CreateReport = () => {
  const user = Authorized()
  const [idActivity, setIdActivity] = useState('')
  const [newReport, setNewReport] = useState(null)

  const projects = Data('projects')
  const activities = Data('activities')

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
      <h1>Crear Informe</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label>
          Temas tratados:
          <textarea name='issues' rows='3' placeholder='Describe los temas tratados' required />
        </label>

        <label>
          Resultados obtenidos:
          <textarea name='results' rows='3' placeholder='Describe los resultados alcanzados' required />
        </label>

        <label>
          Obstáculos:
          <textarea name='obstacle' rows='3' placeholder='Describe los obstáculos enfrentados' />
        </label>

        <label>
          Conclusiones:
          <textarea name='conclusions' rows='3' placeholder='Conclusiones del reporte' required />
        </label>

        <label>
          Anexos:
          <textarea name='anexos' rows='3' placeholder='Documentos adjuntos o referencias' />
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

        <button type='submit'>Crear Informe</button>
      </form>
      <section>
        <p>Nuevo informe</p>
        {JSON.stringify(newReport)}
      </section>

      <a href={`/quantitative/create/${idActivity}`}>
        Ir al paso 2 - Crear Cuantitativos
      </a>
    </main>
  )
}

export default CreateReport
