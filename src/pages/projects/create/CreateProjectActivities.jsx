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
      <section className='flex flex-col justify-center items-center w-[500px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700'>
        <h1 className='text-white text-2xl mb-8'>Crear actividades del proyecto</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-3/4'>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Número de actividad:</p>
            <input type='number' name='numProjectActivity' min='1' max='5' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Actividad:</p>
            <input type='text' name='projectActivity' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Rubro:</p>
            <input type='text' name='category' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <button onClick={pushProjectActivity} className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Agregar</button>
        </form>
        <section className='mt-4 w-3/4'>
          <h2 className='text-white text-lg mb-4'>Actividades agregadas</h2>
          <div className='flex flex-col gap-2 mb-4'>
            {
              projectActivities.map((activity, index) => (
                <div key={index} className='bg-cyan-800 p-3 rounded-md'>
                  <p className='text-cyan-50'>Número: {activity.numProjectActivity}</p>
                  <p className='text-cyan-50'>Actividad: {activity.projectActivity}</p>
                  <p className='text-cyan-50'>Rubro: {activity.category}</p>
                  <button onClick={() => deleteProjectActivity(index)} className='mt-2 px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm'>Eliminar</button>
                </div>
              ))
            }
          </div>
        </section>
        <button onClick={handleSubmit} className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Subir actividades</button>
        <a href='/' className='mt-4 text-cyan-200 hover:text-white'>Finalizar</a>
        <section className='mt-4 w-3/4'>
          <h2 className='text-white text-lg mb-4'>Actividades subidas</h2>
          <div className='flex flex-col gap-2'>
            {
              allProjectActivities.map((activity, index) => (
                <div key={index} className='bg-cyan-800 p-3 rounded-md'>
                  <p className='text-cyan-50'>Número: {activity.num_project_activity}</p>
                  <p className='text-cyan-50'>Actividad: {activity.project_activity}</p>
                  <p className='text-cyan-50'>Rubro: {activity.category}</p>
                </div>
              ))
            }
          </div>
        </section>
      </section>
    </main>
  )
}

export default CreateProjectActivities
