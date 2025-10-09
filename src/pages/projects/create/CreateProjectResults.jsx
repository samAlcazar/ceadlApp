import { useState, useEffect } from 'react'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const CreateProjectResults = () => {
  const user = Authorized()
  const { idProject } = useParams()
  const [allProjectResults, setAllProjectResults] = useState([])
  const [projectResults, setProjectResults] = useState([])

  // useEffect para ver cuando cambia el estado
  useEffect(() => {
    console.log('Resultados actualizados:', projectResults)
  }, [projectResults])

  const pushProjectResult = (e) => {
    e.preventDefault()
    const form = e.target.closest('form')
    const body = {
      numProjectResult: parseInt(form.numProjectResult.value),
      projectResult: form.projectResult.value,
      idProject,
      idUser: user.idUser
    }
    setProjectResults([...projectResults, body])
    form.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`${URL}projectResults/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectResults)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Resultados subidos con éxito:', data)
        setAllProjectResults(data)
      })
      .catch((error) => {
        console.error('Error al subir los resultados:', error)
      })
  }

  const deleteProjectResult = (index) => {
    setProjectResults(projectResults.filter((_, i) => i !== index))
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[900px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700'>
        <h1 className='text-white text-2xl mb-8'>Crear resultados esperados del proyecto</h1>
        <form className='flex flex-col gap-4 w-4/5'>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Número de resultado esperado:</p>
            <input type='number' name='numProjectResult' min='1' max='5' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Resultado esperado:</p>
            <input type='text' name='projectResult' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <button onClick={pushProjectResult} className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Agregar</button>
        </form>
        <section className='mt-4 w-4/5'>
          <h2 className='text-white text-lg mb-4'>Resultados agregados</h2>
          <div className='grid grid-cols-4 gap-2 mb-4'>
            {
              projectResults.map((result, index) => (
                <div key={index} className='bg-cyan-800 p-3 rounded-md'>
                  <p className='text-cyan-50'>Número: {result.numProjectResult}</p>
                  <p className='text-cyan-50'>Resultado: {result.projectResult}</p>
                  <button onClick={() => deleteProjectResult(index)} className='mt-2 px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm'>Eliminar</button>
                </div>
              ))
            }
          </div>
        </section>
        <button onClick={handleSubmit} className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Subir resultados</button>
        <a href={`/projectActivities/create/${idProject}`} className='mt-4 text-cyan-200 hover:text-white'>Continúa en el paso 4</a>
        <section className='mt-4 w-4/5'>
          <p>{allProjectResults.length > 0 ? 'Los resultados se han creado con éxito' : 'Aún no se han subido los resultados'}</p>
          <a href={`/projectActivities/create/${idProject}`} className='mt-4 text-cyan-200 hover:text-white' style={{ display: allProjectResults.length > 0 ? 'block' : 'none' }}>Continúa en el paso 4</a>
        </section>
      </section>
    </main>
  )
}

export default CreateProjectResults
