import Data from '../../../hooks/Data'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'
import { useState } from 'react'

const UpdateProject = () => {
  const user = Authorized()
  const { idProject } = useParams()
  const [newProject, setNewProject] = useState(null)

  const projectLinks = idProject ? `projects/${idProject}` : null
  const projectFoundersLink = idProject ? 'founders' : null

  const project = Data(projectLinks)
  const founders = Data(projectFoundersLink)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!user || !user.idUser) {
      console.error('Usuario no autenticado')
      return
    }

    const body = {
      codProject: e.target.codProject.value,
      nameProject: e.target.nameProject.value,
      objetiveProject: e.target.objetiveProject.value,
      idFounder: e.target.idFounder.value,
      idUser: user.idUser
    }
    fetch(`${URL}projects/${idProject}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el proyecto')
        }
        return response.json()
      })
      .then(data => {
        console.log('Proyecto actualizado:', data)
        setNewProject(data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Actualizar proyecto</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label>
          Código del proyecto:
          <input
            type='text'
            name='codProject'
            defaultValue={project.data?.read_project?.cod_project || ''}
          />
        </label>
        <label>
          Nombre del proyecto:
          <input
            type='text'
            name='nameProject'
            defaultValue={project.data?.read_project?.name_project || ''}
          />
        </label>
        <label>
          Objetivo del proyecto:
          <input
            type='text'
            name='objetiveProject'
            defaultValue={project.data?.read_project?.objetive_project || ''}
          />
        </label>
        <label>
          Financiador:
          <select name='idFounder' required>
            <option value=''>Seleccionar financiador</option>
            {founders.data && founders.data.map((founder) => (
              <option key={founder.id_founder} value={founder.id_founder}>
                {founder.name_founder}
              </option>
            ))}
          </select>
        </label>
        <button type='submit'>Actualizar proyecto</button>
      </form>
      <section>
        {JSON.stringify(newProject !== null ? newProject.update_project : 'No se ha actualizado el proyecto aún')}
      </section>
      <a href={`/especifics/update/${idProject}`}>Continúa en el paso 2</a>
    </main>
  )
}

export default UpdateProject
