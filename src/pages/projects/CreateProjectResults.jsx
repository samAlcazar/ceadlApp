import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const CreateProjectResults = () => {
  const { idProject } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    numResult: '',
    result: '',
    idUser: '',
    idProject: idProject || ''
  })
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`http://localhost:4984/projectResults/project/${idProject}`)
        if (!res.ok) throw new Error('No se pudo cargar la lista de resultados')
        const data = await res.json()
        setResults(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchResults()
  }, [idProject])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      if (!formData.numResult || isNaN(formData.numResult)) {
        throw new Error('El número debe ser válido')
      }
      if (!formData.result || formData.result.length > 200) {
        throw new Error('La descripción debe tener entre 1 y 200 caracteres')
      }
      if (!formData.idUser) {
        throw new Error('El idUser es obligatorio')
      }
      const res = await fetch('http://localhost:4984/projectResults', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Error al crear el resultado')
      const newResult = await res.json()
      setResults(prev => [...prev, newResult])
      setFormData({ numResult: '', result: '', idUser: '', idProject })
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (idResult) => {
    try {
      const res = await fetch(`http://localhost:4984/projectResults/${idResult}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar el resultado')
      setResults(prev => prev.filter(r => r.idResult !== idResult && r.id !== idResult && r._id !== idResult))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleNext = () => {
    navigate(`/projectActivities/create/${idProject}`)
  }

  if (loading) {
    return <main className='w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100'><div className='text-xl'>Cargando resultados...</div></main>
  }

  return (
    <main className='w-screen min-h-screen flex flex-col items-center bg-gray-100 p-4'>
      <h1 className='text-2xl font-bold mb-6'>Crear Resultados para Proyecto</h1>
      {error && <div className='w-full max-w-2xl mb-4 p-4 bg-red-100 text-red-700 rounded'>{error}</div>}
      <form onSubmit={handleSubmit} className='w-full max-w-2xl bg-white p-6 rounded shadow mb-6'>
        <div className='mb-4'>
          <label className='block mb-2'>Número:
            <input type='number' name='numResult' value={formData.numResult} onChange={handleChange} required className='w-full p-2 border rounded mt-1' />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Descripción:
            <input type='text' name='result' value={formData.result} onChange={handleChange} maxLength={200} required className='w-full p-2 border rounded mt-1' />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>ID User:
            <input type='text' name='idUser' value={formData.idUser} onChange={handleChange} required className='w-full p-2 border rounded mt-1' />
          </label>
        </div>
        <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700'>Agregar Resultado</button>
      </form>
      <section className='w-full max-w-2xl bg-white p-6 rounded shadow mb-6'>
        <h2 className='text-xl font-bold mb-4'>Lista de Resultados</h2>
        {results.length === 0 ? <div>No hay resultados creados.</div> : (
          <ul className='space-y-2'>
            {results.map(r => (
              <li key={r.idResult || r.id || r._id} className='flex justify-between items-center border-b py-2'>
                <span>#{r.numResult}: {r.result}</span>
                <button onClick={() => handleDelete(r.idResult || r.id || r._id)} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700'>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <button onClick={handleNext} className='w-full max-w-2xl bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700'>Siguiente: Project Activities</button>
    </main>
  )
}

export default CreateProjectResults
