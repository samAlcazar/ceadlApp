import { useState, useEffect } from 'react'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const CreateEspecifics = () => {
  const user = Authorized()
  const { idProject } = useParams()
  const [allEspecifics, setAllEspecifics] = useState([])
  const [especifics, setEspecifics] = useState([])

  // useEffect para ver cuando cambia el estado
  useEffect(() => {
    console.log('Específicos actualizados:', especifics)
  }, [especifics])

  const pushEspecific = (e) => {
    e.preventDefault()

    // Acceder al formulario desde el botón
    const form = e.target.closest('form')
    const body = {
      numEspecific: parseInt(form.numEspecific.value),
      especific: form.especific.value,
      idProject,
      idUser: user.idUser
    }
    setEspecifics([...especifics, body])
    form.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`${URL}especifics/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(especifics)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Específicos subidos con éxito:', data)
        setAllEspecifics(data)
      })
      .catch((error) => {
        console.error('Error al subir los específicos:', error)
      })
  }

  const deleteEspecific = (index) => {
    setEspecifics(especifics.filter((_, i) => i !== index))
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Crear objetivos específicos del proyecto</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label>
          Número de objetivo específico:
          <input type='number' name='numEspecific' min='1' max='5' required />
        </label>
        <label>
          Objetivo específico:
          <input type='text' name='especific' required />
        </label>
        <button onClick={pushEspecific}>Agregar</button>
      </form>
      <a href={`/projectResults/create/${idProject}`}>Continúa en el paso 3</a>
      <section>
        <h2>Específicos agregados</h2>
        {
          especifics.map((especific, index) => (
            <div key={index}>
              <p>Número: {especific.numEspecific}</p>
              <p>Objetivo: {especific.especific}</p>
              <button onClick={() => deleteEspecific(index)}>Eliminar</button>
            </div>
          ))
        }
      </section>
      <button onClick={handleSubmit}>Subir</button>
      <section>
        <h2>Específicos subidos</h2>
        {
          allEspecifics.map((especific, index) => (
            <div key={index}>
              <p>Número: {especific.num_especific}</p>
              <p>Objetivo: {especific.especific}</p>
            </div>
          ))
        }
      </section>
    </main>
  )
}

export default CreateEspecifics
