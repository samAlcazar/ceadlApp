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
      <h1>Crear resultados esperados del proyecto</h1>
      <form className='flex flex-col gap-4'>
        <label>
          Número de resultado esperado:
          <input type='number' name='numProjectResult' min='1' max='5' required />
        </label>
        <label>
          Resultado esperado:
          <input type='text' name='projectResult' required />
        </label>
        <button onClick={pushProjectResult}>Agregar</button>
      </form>
      <a href={`/projectActivities/create/${idProject}`}>Continúa en el paso 4</a>
      <section>
        <h2>Resultados agregados</h2>
        {
          projectResults.map((result, index) => (
            <div key={index}>
              <p>Número: {result.numProjectResult}</p>
              <p>Resultado: {result.projectResult}</p>
              <button onClick={() => deleteProjectResult(index)}>Eliminar</button>
            </div>
          ))
        }
      </section>
      <button onClick={handleSubmit}>Subir</button>
      <section>
        <h2>Resultados subidos</h2>
        {
          allProjectResults.map((result, index) => (
            <div key={index}>
              <p>Número: {result.num_project_result}</p>
              <p>Resultado: {result.project_result}</p>
            </div>
          ))
        }
      </section>
    </main>
  )
}

export default CreateProjectResults
