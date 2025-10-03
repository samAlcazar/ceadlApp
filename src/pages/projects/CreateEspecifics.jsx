import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const CreateEspecifics = () => {
  const { idProject } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    numEspecific: '',
    especific: '',
    idUser: '',
    idProject: idProject || ''
  })
  const [especifics, setEspecifics] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cargar especifics existentes
  useEffect(() => {
    const fetchEspecifics = async () => {
      try {
        const res = await fetch(`http://localhost:4984/especifics/project/${idProject}`)
        if (!res.ok) throw new Error('No se pudo cargar la lista de especifics')
        const data = await res.json()
        setEspecifics(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchEspecifics()
  }, [idProject])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      if (!formData.numEspecific || isNaN(formData.numEspecific)) {
        throw new Error('El número debe ser válido')
      }
      if (!formData.especific || formData.especific.length > 200) {
        throw new Error('La descripción debe tener entre 1 y 200 caracteres')
      }
      if (!formData.idUser) {
        throw new Error('El idUser es obligatorio')
      }
      const res = await fetch('http://localhost:4984/especifics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Error al crear el especific')
      const newEspecific = await res.json()
      setEspecifics(prev => [...prev, newEspecific])
      setFormData({ numEspecific: '', especific: '', idUser: '', idProject })
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (idEspecific) => {
    try {
      const res = await fetch(`http://localhost:4984/especifics/${idEspecific}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar el especific')
      setEspecifics(prev => prev.filter(e => e.idEspecific !== idEspecific && e.id !== idEspecific && e._id !== idEspecific))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleNext = () => {
    navigate(`/projectResults/create/${idProject}`)
  }

  if (loading) {
    return <main className='w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100'><div className='text-xl'>Cargando especifics...</div></main>
  }

  return (
    <main className='w-screen min-h-screen flex flex-col items-center bg-gray-100 p-4'>
      <h1 className='text-2xl font-bold mb-6'>Crear Especifics para Proyecto</h1>
      {error && <div className='w-full max-w-2xl mb-4 p-4 bg-red-100 text-red-700 rounded'>{error}</div>}
      <form onSubmit={handleSubmit} className='w-full max-w-2xl bg-white p-6 rounded shadow mb-6'>
        <div className='mb-4'>
          <label className='block mb-2'>Número:
            <input type='number' name='numEspecific' value={formData.numEspecific} onChange={handleChange} required className='w-full p-2 border rounded mt-1' />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Descripción:
            <input type='text' name='especific' value={formData.especific} onChange={handleChange} maxLength={200} required className='w-full p-2 border rounded mt-1' />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>ID User:
            <input type='text' name='idUser' value={formData.idUser} onChange={handleChange} required className='w-full p-2 border rounded mt-1' />
          </label>
        </div>
        <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700'>Agregar Especific</button>
      </form>
      <section className='w-full max-w-2xl bg-white p-6 rounded shadow mb-6'>
        <h2 className='text-xl font-bold mb-4'>Lista de Especifics</h2>
        {especifics.length === 0 ? <div>No hay especifics creados.</div> : (
          <ul className='space-y-2'>
            {especifics.map(e => (
              <li key={e.idEspecific || e.id || e._id} className='flex justify-between items-center border-b py-2'>
                <span>#{e.numEspecific}: {e.especific}</span>
                <button onClick={() => handleDelete(e.idEspecific || e.id || e._id)} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700'>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <button onClick={handleNext} className='w-full max-w-2xl bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700'>Siguiente: Project Results</button>
    </main>
  )
}

export default CreateEspecifics
