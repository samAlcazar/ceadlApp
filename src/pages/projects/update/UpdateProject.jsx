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
      <section className='flex flex-col justify-center items-center w-[500px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700'>
        <h1 className='text-white text-2xl mb-8'>Actualizar proyecto</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-3/4'>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Código del proyecto:</p>
            <input
              type='text'
              name='codProject'
              defaultValue={project.data?.read_project?.cod_project || ''}
              className='px-2 py-1 mt-2 rounded-md bg-cyan-700'
            />
          </label>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Nombre del proyecto:</p>
            <input
              type='text'
              name='nameProject'
              defaultValue={project.data?.read_project?.name_project || ''}
              className='px-2 py-1 mt-2 rounded-md bg-cyan-700'
            />
          </label>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Objetivo del proyecto:</p>
            <input
              type='text'
              name='objetiveProject'
              defaultValue={project.data?.read_project?.objetive_project || ''}
              className='px-2 py-1 mt-2 rounded-md bg-cyan-700'
            />
          </label>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Financiador:</p>
            <select name='idFounder' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white'>
              <option value=''>Seleccionar financiador</option>
              {founders.data && founders.data.map((founder) => (
                <option key={founder.id_founder} value={founder.id_founder}>
                  {founder.name_founder}
                </option>
              ))}
            </select>
          </label>
          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Actualizar proyecto</button>
        </form>
        <section className='mt-4 w-3/4'>
          <div className='bg-cyan-800 p-3 rounded-md'>
            <p className='text-cyan-50'>{JSON.stringify(newProject !== null ? newProject.update_project : 'No se ha actualizado el proyecto aún')}</p>
          </div>
        </section>
        <a href={`/especifics/update/${idProject}`} className='mt-4 text-cyan-200 hover:text-white'>Continúa en el paso 2</a>
      </section>
    </main>
  )
}

export default UpdateProject
