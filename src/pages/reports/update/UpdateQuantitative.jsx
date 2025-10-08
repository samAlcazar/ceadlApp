import Data from '../../../hooks/Data'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const UpdateQuantitative = () => {
  const user = Authorized()
  const { idActivity } = useParams()

  const quantitativeLink = idActivity ? `quantitatives/activity/${idActivity}` : null
  const quantitative = Data(quantitativeLink)
  console.log(quantitative)

  // Función para actualizar reportes existentes
  const handleUpdateSubmit = (e) => {
    e.preventDefault()

    const idQuantitative = e.target.idQuantitative.value

    const body = {
      achieved: Number(e.target.achieved.value),
      day: e.target.day.value,
      spFemale: Number(e.target.spFemale.value),
      spMale: Number(e.target.spMale.value),
      fFemale: Number(e.target.fFemale.value),
      fMale: Number(e.target.fMale.value),
      naFemale: Number(e.target.naFemale.value),
      naMale: Number(e.target.naMale.value),
      pFemale: Number(e.target.pFemale.value),
      pMale: Number(e.target.pMale.value),
      idUser: user.idUser,
      idActivity
    }

    fetch(`${URL}quantitatives/${idQuantitative}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el reporte cuantitativo')
        }
        return response.json()
      })
      .then(data => {
        console.log('Reporte cuantitativo actualizado:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleDelete = (idQuantitative) => {
    fetch(`${URL}quantitatives/${idQuantitative}`, {
      method: 'DELETE'
    })
      .then(response => {
        response.json()
      })
      .then(data => {
        console.log('Reporte cuantitativo eliminado:', data)
        window.location.reload() // Recarga la página para ver los cambios
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  // Función para subir todos los nuevos reportes
  const handleCreateSubmit = (e) => {
    e.preventDefault()

    const form = e.target.closest('form')
    const body = {
      achieved: parseInt(form.achieved.value),
      day: form.day.value,
      spFemale: parseInt(form.spFemale.value),
      spMale: parseInt(form.spMale.value),
      fFemale: parseInt(form.fFemale.value),
      fMale: parseInt(form.fMale.value),
      naFemale: parseInt(form.naFemale.value),
      naMale: parseInt(form.naMale.value),
      pFemale: parseInt(form.pFemale.value),
      pMale: parseInt(form.pMale.value),
      idActivity,
      idUser: user.idUser
    }

    fetch(`${URL}quantitatives`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Reportes cuantitativos subidos con éxito:', data) // Limpiar la lista de nuevos reportes
        window.location.reload() // Recargar para ver todos los cambios
      })
      .catch((error) => {
        console.error('Error al subir los reportes cuantitativos:', error)
      })
  }

  // Don't render if idActivity is not available yet
  if (!idActivity) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando actividad...</h1>
      </main>
    )
  }

  // Show loading state
  if (quantitative.loading) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando reportes cuantitativos...</h1>
      </main>
    )
  }

  // Show error state
  if (quantitative.error) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Error al cargar reportes cuantitativos</h1>
        <p>Error: {quantitative.error}</p>
      </main>
    )
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Actualizar Reportes Cuantitativos</h1>

      {/* Reportes existentes */}
      <h2>Reportes Existentes</h2>
      {quantitative.data && quantitative.data.length > 0 && (
        <div className='flex'>
          {quantitative.data[0].list_quantitatives_by_activity.map((report) => (
            <form onSubmit={handleUpdateSubmit} key={report.id_quantitative} className='flex flex-col'>
              <h3>Reporte del {report.day}</h3>
              <input type='hidden' value={report.id_quantitative} name='idQuantitative' />
              <label>
                Logrado:
                <input type='number' name='achieved' defaultValue={report.achieved} min='0' />
              </label>
              <label>
                Día:
                <input type='date' name='day' defaultValue={report.day} />
              </label>
              <label>
                SP Mujeres:
                <input type='number' name='spFemale' defaultValue={report.sp_female} min='0' />
              </label>
              <label>
                SP Hombres:
                <input type='number' name='spMale' defaultValue={report.sp_male} min='0' />
              </label>
              <label>
                F Mujeres:
                <input type='number' name='fFemale' defaultValue={report.f_female} min='0' />
              </label>
              <label>
                F Hombres:
                <input type='number' name='fMale' defaultValue={report.f_male} min='0' />
              </label>
              <label>
                NA Mujeres:
                <input type='number' name='naFemale' defaultValue={report.na_female} min='0' />
              </label>
              <label>
                NA Hombres:
                <input type='number' name='naMale' defaultValue={report.na_male} min='0' />
              </label>
              <label>
                P Mujeres:
                <input type='number' name='pFemale' defaultValue={report.p_female} min='0' />
              </label>
              <label>
                P Hombres:
                <input type='number' name='pMale' defaultValue={report.p_male} min='0' />
              </label>
              <button type='submit'>Actualizar</button>
              <button type='button' onClick={() => handleDelete(report.id_quantitative)}>
                Eliminar
              </button>
            </form>
          ))}
        </div>
      )}
      {(!quantitative.data || quantitative.data.length === 0) && (
        <p>No hay reportes cuantitativos disponibles</p>
      )}

      {/* Nuevo reporte */}
      <h2>Agregar Nuevo Reporte</h2>
      <form className='flex flex-col' onSubmit={handleCreateSubmit}>
        <label>
          Logrado:
          <input type='number' name='achieved' min='0' required />
        </label>
        <label>
          Día:
          <input type='date' name='day' required />
        </label>
        <label>
          SP Mujeres:
          <input type='number' name='spFemale' min='0' defaultValue='0' />
        </label>
        <label>
          SP Hombres:
          <input type='number' name='spMale' min='0' defaultValue='0' />
        </label>
        <label>
          F Mujeres:
          <input type='number' name='fFemale' min='0' defaultValue='0' />
        </label>
        <label>
          F Hombres:
          <input type='number' name='fMale' min='0' defaultValue='0' />
        </label>
        <label>
          NA Mujeres:
          <input type='number' name='naFemale' min='0' defaultValue='0' />
        </label>
        <label>
          NA Hombres:
          <input type='number' name='naMale' min='0' defaultValue='0' />
        </label>
        <label>
          P Mujeres:
          <input type='number' name='pFemale' min='0' defaultValue='0' />
        </label>
        <label>
          P Hombres:
          <input type='number' name='pMale' min='0' defaultValue='0' />
        </label>
        <button type='submit'>
          Crear nuevo
        </button>
      </form>

      <a href='/reports/history'>Finalizar</a>
    </main>
  )
}

export default UpdateQuantitative
