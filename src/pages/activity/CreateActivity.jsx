import { useState } from 'react'

const CreateActivity = () => {
  const [formData, setFormData] = useState({
    activity: '',
    dateStart: '',
    dateEnd: '',
    place: '',
    participantsExpeted: '',
    objetive: '',
    resultExpected: '',
    descriptionActivity: '',
    idProject: '',
    idEspecific: '',
    idUser: '',
    idProjectResult: '',
    idProjectActivity: ''
  })

  const [error, setError] = useState(null)

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
      // Validaciones básicas
      if (!formData.activity || formData.activity.length > 100) {
        throw new Error('La actividad debe tener entre 1 y 100 caracteres')
      }
      if (!formData.place || formData.place.length > 100) {
        throw new Error('El lugar debe tener entre 1 y 100 caracteres')
      }
      if (!formData.participantsExpeted || formData.participantsExpeted < 1) {
        throw new Error('El número de participantes debe ser al menos 1')
      }

      const response = await fetch('http://localhost:3000/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Error al crear la actividad')
      }

      // Limpiar formulario después de éxito
      setFormData({
        activity: '',
        dateStart: '',
        dateEnd: '',
        place: '',
        participantsExpeted: '',
        objetive: '',
        resultExpected: '',
        descriptionActivity: '',
        idProject: '',
        idEspecific: '',
        idUser: '',
        idProjectResult: '',
        idProjectActivity: ''
      })

      alert('Actividad creada exitosamente')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className='w-screen min-h-screen flex flex-col items-center bg-gray-100 p-4'>
      <h1 className='text-2xl font-bold mb-6'>Crear Actividad</h1>
      
      {error && (
        <div className='w-full max-w-2xl mb-4 p-4 bg-red-100 text-red-700 rounded'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className='w-full max-w-2xl bg-white p-6 rounded shadow'>
        <div className='mb-4'>
          <label className='block mb-2'>
            Nombre de la Actividad:
            <input
              type='text'
              name='activity'
              value={formData.activity}
              onChange={handleChange}
              maxLength={100}
              required
              className='w-full p-2 border rounded mt-1'
            />
          </label>
        </div>

        <div className='mb-4 grid grid-cols-2 gap-4'>
          <label className='block'>
            Fecha de Inicio:
            <input
              type='date'
              name='dateStart'
              value={formData.dateStart}
              onChange={handleChange}
              required
              className='w-full p-2 border rounded mt-1'
            />
          </label>

          <label className='block'>
            Fecha de Fin:
            <input
              type='date'
              name='dateEnd'
              value={formData.dateEnd}
              onChange={handleChange}
              required
              className='w-full p-2 border rounded mt-1'
            />
          </label>
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>
            Lugar:
            <input
              type='text'
              name='place'
              value={formData.place}
              onChange={handleChange}
              maxLength={100}
              required
              className='w-full p-2 border rounded mt-1'
            />
          </label>
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>
            Número de Participantes Esperados:
            <input
              type='number'
              name='participantsExpeted'
              value={formData.participantsExpeted}
              onChange={handleChange}
              min={1}
              required
              className='w-full p-2 border rounded mt-1'
            />
          </label>
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>
            Objetivo:
            <textarea
              name='objetive'
              value={formData.objetive}
              onChange={handleChange}
              required
              className='w-full p-2 border rounded mt-1'
              rows={3}
            />
          </label>
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>
            Resultado Esperado:
            <textarea
              name='resultExpected'
              value={formData.resultExpected}
              onChange={handleChange}
              required
              className='w-full p-2 border rounded mt-1'
              rows={3}
            />
          </label>
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>
            Descripción de la Actividad:
            <textarea
              name='descriptionActivity'
              value={formData.descriptionActivity}
              onChange={handleChange}
              required
              className='w-full p-2 border rounded mt-1'
              rows={4}
            />
          </label>
        </div>

        <div className='grid grid-cols-2 gap-4 mb-4'>
          <label className='block'>
            ID del Proyecto:
            <input
              type='text'
              name='idProject'
              value={formData.idProject}
              onChange={handleChange}
              required
              className='w-full p-2 border rounded mt-1'
            />
          </label>

          <label className='block'>
            ID Específico:
            <input
              type='text'
              name='idEspecific'
              value={formData.idEspecific}
              onChange={handleChange}
              required
              className='w-full p-2 border rounded mt-1'
            />
          </label>
        </div>

        <div className='grid grid-cols-3 gap-4 mb-4'>
          <label className='block'>
            ID del Usuario:
            <input
              type='text'
              name='idUser'
              value={formData.idUser}
              onChange={handleChange}
              required
              className='w-full p-2 border rounded mt-1'
            />
          </label>

          <label className='block'>
            ID del Resultado del Proyecto:
            <input
              type='text'
              name='idProjectResult'
              value={formData.idProjectResult}
              onChange={handleChange}
              required
              className='w-full p-2 border rounded mt-1'
            />
          </label>

          <label className='block'>
            ID de la Actividad del Proyecto:
            <input
              type='text'
              name='idProjectActivity'
              value={formData.idProjectActivity}
              onChange={handleChange}
              required
              className='w-full p-2 border rounded mt-1'
            />
          </label>
        </div>

        <button 
          type='submit'
          className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors'
        >
          Crear Actividad
        </button>
      </form>
    </main>
  )
}

export default CreateActivity