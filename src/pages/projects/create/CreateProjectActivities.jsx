import { useState, useEffect } from 'react'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const CreateProjectActivities = () => {
  const user = Authorized()
  const { idProject } = useParams()
  const [allProjectActivities, setAllProjectActivities] = useState([])
  const [projectActivities, setProjectActivities] = useState([])

  // useEffect para ver cuando cambia el estado
  useEffect(() => {
    console.log('Actividades actualizadas:', projectActivities)
  }, [projectActivities])

  const pushProjectActivity = (e) => {
    e.preventDefault()

    // Acceder al formulario desde el botón
    const form = e.target.closest('form')
    const body = {
      numProjectActivity: parseInt(form.numProjectActivity.value),
      projectActivity: form.projectActivity.value,
      category: form.category.value,
      idProject,
      idUser: user.idUser
    }
    setProjectActivities([...projectActivities, body])
    form.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`${URL}projectActivities/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectActivities)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Actividades subidas con éxito:', data)
        setAllProjectActivities(data)
      })
      .catch((error) => {
        console.error('Error al subir las actividades:', error)
      })
  }

  const deleteProjectActivity = (index) => {
    setProjectActivities(projectActivities.filter((_, i) => i !== index))
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Crear actividades del proyecto</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label>
          Número de actividad:
          <input type='number' name='numProjectActivity' min='1' max='5' required />
        </label>
        <label>
          Actividad:
          <input type='text' name='projectActivity' required />
        </label>
        <label>
          Rubro:
          <input type='text' name='category' required />
        </label>
        <button onClick={pushProjectActivity}>Agregar</button>
      </form>
      <a href='/'>Finalizar</a>
      <section>
        <h2>Actividades agregadas</h2>
        {
          projectActivities.map((activity, index) => (
            <div key={index}>
              <p>Número: {activity.numProjectActivity}</p>
              <p>Actividad: {activity.projectActivity}</p>
              <p>Rubro: {activity.category}</p>
              <button onClick={() => deleteProjectActivity(index)}>Eliminar</button>
            </div>
          ))
        }
      </section>
      <button onClick={handleSubmit}>Subir</button>
      <section>
        <h2>Actividades subidas</h2>
        {
          allProjectActivities.map((activity, index) => (
            <div key={index}>
              <p>Número: {activity.num_project_activity}</p>
              <p>Actividad: {activity.project_activity}</p>
              <p>Rubro: {activity.category}</p>
            </div>
          ))
        }
      </section>
    </main>
  )
}

export default CreateProjectActivities
