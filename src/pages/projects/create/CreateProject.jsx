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
      <h1>Crear proyecto</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label>
          Código del proyecto:
          <input type='text' name='codProject' />
        </label>
        <label>
          Nombre del proyecto:
          <input type='text' name='nameProject' />
        </label>
        <label>
          Objetivo del proyecto:
          <input type='text' name='objetiveProject' />
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
        <button type='submit'>Crear proyecto</button>
      </form>
      <a href={`/especifics/create/${param}`}>Continúa en el paso 2</a>
      <section>
        {JSON.stringify(project)}
      </section>
    </main>
  )
}

export default CreateProject
