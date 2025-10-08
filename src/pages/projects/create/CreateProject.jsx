import { useState } from 'react'
import Authorized from '../../../hooks/Authorized'
import { URL } from '../../../../utils/url'
import Data from '../../../hooks/Data'

const CreateProject = () => {
  const user = Authorized()
  const [project, setProject] = useState({})
  const founders = Data('founders')

  const handleSubmit = (e) => {
    e.preventDefault()

    const body = {
      codProject: e.target.codProject.value,
      nameProject: e.target.nameProject.value,
      objetiveProject: e.target.objetiveProject.value,
      idFounder: e.target.idFounder.value,
      idUser: user.idUser
    }

    fetch(`${URL}projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al crear el proyecto')
        }
        return response.json()
      })
      .then((data) => {
        setProject(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const param = project && project.create_project ? project.create_project.id_project : 'asd'

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[500px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700'>
        <h1 className='text-white text-2xl mb-8'>Crear proyecto</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-3/4'>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Código del proyecto:</p>
            <input type='text' name='codProject' className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Nombre del proyecto:</p>
            <input type='text' name='nameProject' className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Objetivo del proyecto:</p>
            <input type='text' name='objetiveProject' className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
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
          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Crear proyecto</button>
        </form>
        <a href={`/especifics/create/${param}`} className='mt-4 text-cyan-200 hover:text-white'>Continúa en el paso 2</a>
        <section className='mt-4'>
          {JSON.stringify(project)}
        </section>
      </section>
    </main>
  )
}

export default CreateProject
