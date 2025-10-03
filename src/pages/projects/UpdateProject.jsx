
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const UpdateProject = () => {
  const { idProject } = useParams()
  const [formData, setFormData] = useState({
    codProject: '',
    nameProject: '',
    objetiveProject: '',
    idFounder: '',
    idUser: ''
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:4984/projects/${idProject}`)
        if (!response.ok) {
          throw new Error('No se pudo cargar el proyecto')
        }
        const data = await response.json()
        setFormData(data)
        setLoading(false)
      } catch (err) {
        setError('Error al cargar el proyecto: ' + err.message)
        setLoading(false)
      }
    }
    fetchProject()
  }, [idProject])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      if (!formData.codProject || formData.codProject.length > 20) {
        throw new Error('El código debe tener entre 1 y 20 caracteres')
      }
      if (!formData.nameProject || formData.nameProject.length > 100) {
        throw new Error('El nombre debe tener entre 1 y 100 caracteres')
      }
      if (!formData.objetiveProject || formData.objetiveProject.length > 200) {
        throw new Error('El objetivo debe tener entre 1 y 200 caracteres')
      }
      if (!formData.idFounder) {
        throw new Error('El idFounder es obligatorio')
      }
      if (!formData.idUser) {
        throw new Error('El idUser es obligatorio')
      }

      const response = await fetch(`http://localhost:4984/projects/${idProject}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        throw new Error('Error al actualizar el proyecto')
      }
      alert('Proyecto actualizado exitosamente')
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <main className='w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100'>
        <div className='text-xl'>Cargando proyecto...</div>
      </main>
    )
  }

  return (
    <main className='w-screen min-h-screen flex flex-col items-center bg-gray-100 p-4'>
      <h1 className='text-2xl font-bold mb-6'>Actualizar Proyecto</h1>
      {error && (
        <div className='w-full max-w-2xl mb-4 p-4 bg-red-100 text-red-700 rounded'>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className='w-full max-w-2xl bg-white p-6 rounded shadow'>
        <div className='mb-4'>
          <label className='block mb-2'>
            Código del Proyecto:
            <input
              type='text'
              name='codProject'
              value={formData.codProject}
              onChange={handleChange}
              maxLength={20}
              required
              className='w-full p-2 border rounded mt-1'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>
            Nombre del Proyecto:
            <input
              type='text'
              name='nameProject'
              value={formData.nameProject}
              onChange={handleChange}
              maxLength={100}
              required
              className='w-full p-2 border rounded mt-1'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>
            Objetivo del Proyecto:
            <textarea
              name='objetiveProject'
              value={formData.objetiveProject}
              onChange={handleChange}
              maxLength={200}
              required
              className='w-full p-2 border rounded mt-1'
            />
          </label>
        </div>
        <div className='mb-4 grid grid-cols-2 gap-4'>
          <label className='block'>
            ID Founder:
            <input
              type='text'
              name='idFounder'
              value={formData.idFounder}
              onChange={handleChange}
              required
              className='w-full p-2 border rounded mt-1'
            />
          </label>
          <label className='block'>
            ID User:
            <input
              type='text'
              name='idUser'
              value={formData.idUser}
              onChange={handleChange}
              required
              className='w-full p-2 border rounded mt-1'
            />
          </label>
        </div>
        <button type='submit' className='w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700'>Actualizar Proyecto</button>
      </form>
    </main>
  )
}

export default UpdateProject