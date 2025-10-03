import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const CreateProjectActivities = () => {
  const { idProject } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    numActivity: '',
    activity: '',
    idUser: '',
    idProject: idProject || ''
  })
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(`http://localhost:4984/projectActivities/project/${idProject}`)
        if (!res.ok) throw new Error('No se pudo cargar la lista de actividades')
        const data = await res.json()
        setActivities(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchActivities()
  }, [idProject])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      if (!formData.numActivity || isNaN(formData.numActivity)) {
        throw new Error('El número debe ser válido')
      }
      if (!formData.activity || formData.activity.length > 200) {
        throw new Error('La descripción debe tener entre 1 y 200 caracteres')
      }
      if (!formData.idUser) {
        throw new Error('El idUser es obligatorio')
      }
      const res = await fetch('http://localhost:4984/projectActivities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Error al crear la actividad')
      const newActivity = await res.json()
      setActivities(prev => [...prev, newActivity])
      setFormData({ numActivity: '', activity: '', idUser: '', idProject })
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (idActivity) => {
    try {
      const res = await fetch(`http://localhost:4984/projectActivities/${idActivity}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar la actividad')
      setActivities(prev => prev.filter(a => a.idActivity !== idActivity && a.id !== idActivity && a._id !== idActivity))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleFinish = () => {
    navigate(`/projects`) // Puedes cambiar la ruta final según tu flujo
  }

  if (loading) {
    return <main className='w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100'><div className='text-xl'>Cargando actividades...</div></main>
  }

  return (
    <main className='w-screen min-h-screen flex flex-col items-center bg-gray-100 p-4'>
      <h1 className='text-2xl font-bold mb-6'>Crear Actividades para Proyecto</h1>
      {error && <div className='w-full max-w-2xl mb-4 p-4 bg-red-100 text-red-700 rounded'>{error}</div>}
      <form onSubmit={handleSubmit} className='w-full max-w-2xl bg-white p-6 rounded shadow mb-6'>
        <div className='mb-4'>
          <label className='block mb-2'>Número:
            <input type='number' name='numActivity' value={formData.numActivity} onChange={handleChange} required className='w-full p-2 border rounded mt-1' />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Descripción:
            <input type='text' name='activity' value={formData.activity} onChange={handleChange} maxLength={200} required className='w-full p-2 border rounded mt-1' />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>ID User:
            <input type='text' name='idUser' value={formData.idUser} onChange={handleChange} required className='w-full p-2 border rounded mt-1' />
          </label>
        </div>
        <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700'>Agregar Actividad</button>
      </form>
      <section className='w-full max-w-2xl bg-white p-6 rounded shadow mb-6'>
        <h2 className='text-xl font-bold mb-4'>Lista de Actividades</h2>
        {activities.length === 0 ? <div>No hay actividades creadas.</div> : (
          <ul className='space-y-2'>
            {activities.map(a => (
              <li key={a.idActivity || a.id || a._id} className='flex justify-between items-center border-b py-2'>
                <span>#{a.numActivity}: {a.activity}</span>
                <button onClick={() => handleDelete(a.idActivity || a.id || a._id)} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700'>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <button onClick={handleFinish} className='w-full max-w-2xl bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700'>Finalizar</button>
    </main>
  )
}

export default CreateProjectActivities
