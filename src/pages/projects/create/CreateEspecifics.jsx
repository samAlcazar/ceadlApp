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
      <section className='flex flex-col justify-center items-center w-[900px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700'>
        <h1 className='text-white text-2xl mb-8'>Crear objetivos específicos del proyecto</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-4/5'>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Número de objetivo específico:</p>
            <input type='number' name='numEspecific' min='1' max='5' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Objetivo específico:</p>
            <input type='text' name='especific' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <button onClick={pushEspecific} className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Agregar</button>
        </form>
        <section className='mt-4 w-4/5'>
          <h2 className='text-white text-lg mb-4'>Específicos agregados</h2>
          <div className='grid grid-cols-4 gap-2 mb-4'>
            {
              especifics.map((especific, index) => (
                <div key={index} className='bg-cyan-800 p-3 rounded-md'>
                  <p className='text-cyan-50'>Número: {especific.numEspecific}</p>
                  <p className='text-cyan-50'>Objetivo: {especific.especific}</p>
                  <button onClick={() => deleteEspecific(index)} className='mt-2 px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm'>Eliminar</button>
                </div>
              ))
            }
          </div>
        </section>
        <button onClick={handleSubmit} className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Subir específicos</button>
        <section className='mt-4 w-3/4'>
          <p>{allEspecifics.length > 0 ? 'Los específicos se han creado con éxito' : 'Aún no se han subido los específicos'}</p>
          <a href={`/projectResults/create/${idProject}`} className='mt-4 text-cyan-200 hover:text-white' style={{ display: allEspecifics.length > 0 ? 'block' : 'none' }}>Continúa en el paso 3</a>
        </section>
      </section>
    </main>
  )
}

export default CreateEspecifics
