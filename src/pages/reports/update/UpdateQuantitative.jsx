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
        <section className='flex flex-col justify-center items-center w-[500px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700'>
          <h1 className='text-white text-2xl'>Cargando actividad...</h1>
        </section>
      </main>
    )
  }

  // Show loading state
  if (quantitative.loading) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <section className='flex flex-col justify-center items-center w-[500px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700'>
          <h1 className='text-white text-2xl'>Cargando reportes cuantitativos...</h1>
        </section>
      </main>
    )
  }

  // Show error state
  if (quantitative.error) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <section className='flex flex-col justify-center items-center w-[500px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700'>
          <h1 className='text-white text-2xl mb-4'>Error al cargar reportes cuantitativos</h1>
          <p className='text-cyan-200'>Error: {quantitative.error}</p>
        </section>
      </main>
    )
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[900px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
        <h1 className='text-white text-2xl mb-8'>Actualizar Reportes Cuantitativos</h1>

        {/* Reportes existentes */}
        <h2 className='text-white text-lg mb-4'>Reportes Existentes</h2>
        {quantitative.data && quantitative.data.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4 mb-6'>
            {quantitative.data[0].list_quantitatives_by_activity.map((report) => (
              <form onSubmit={handleUpdateSubmit} key={report.id_quantitative} className='bg-cyan-800 p-4 rounded-lg flex flex-col gap-3'>
                <h3 className='text-cyan-50 text-lg font-semibold'>Reporte del {report.day}</h3>
                <input type='hidden' value={report.id_quantitative} name='idQuantitative' />
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Logrado:</p>
                  <input type='number' name='achieved' defaultValue={report.achieved} min='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Día:</p>
                  <input type='date' name='day' defaultValue={report.day} className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
                </label>
                <div className='grid grid-cols-2 gap-2'>
                  <label className='grid text-cyan-50'>
                    <p className='text-cyan-50 text-sm'>SP Mujeres:</p>
                    <input type='number' name='spFemale' defaultValue={report.sp_female} min='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-sm' />
                  </label>
                  <label className='grid text-cyan-50'>
                    <p className='text-cyan-50 text-sm'>SP Hombres:</p>
                    <input type='number' name='spMale' defaultValue={report.sp_male} min='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-sm' />
                  </label>
                  <label className='grid text-cyan-50'>
                    <p className='text-cyan-50 text-sm'>F Mujeres:</p>
                    <input type='number' name='fFemale' defaultValue={report.f_female} min='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-sm' />
                  </label>
                  <label className='grid text-cyan-50'>
                    <p className='text-cyan-50 text-sm'>F Hombres:</p>
                    <input type='number' name='fMale' defaultValue={report.f_male} min='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-sm' />
                  </label>
                  <label className='grid text-cyan-50'>
                    <p className='text-cyan-50 text-sm'>NA Mujeres:</p>
                    <input type='number' name='naFemale' defaultValue={report.na_female} min='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-sm' />
                  </label>
                  <label className='grid text-cyan-50'>
                    <p className='text-cyan-50 text-sm'>NA Hombres:</p>
                    <input type='number' name='naMale' defaultValue={report.na_male} min='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-sm' />
                  </label>
                  <label className='grid text-cyan-50'>
                    <p className='text-cyan-50 text-sm'>P Mujeres:</p>
                    <input type='number' name='pFemale' defaultValue={report.p_female} min='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-sm' />
                  </label>
                  <label className='grid text-cyan-50'>
                    <p className='text-cyan-50 text-sm'>P Hombres:</p>
                    <input type='number' name='pMale' defaultValue={report.p_male} min='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-sm' />
                  </label>
                </div>
                <div className='flex gap-2 mt-2'>
                  <button type='submit' className='px-3 py-1 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white text-sm flex-1'>Actualizar</button>
                  <button type='button' onClick={() => handleDelete(report.id_quantitative)} className='px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm flex-1'>
                    Eliminar
                  </button>
                </div>
              </form>
            ))}
          </div>
        )}
        {(!quantitative.data || quantitative.data.length === 0) && (
          <p className='text-cyan-200'>No hay reportes cuantitativos disponibles</p>
        )}

        {/* Nuevo reporte */}
        <h2 className='text-white text-lg mb-4'>Agregar Nuevo Reporte</h2>
        <form className='flex flex-col gap-4 w-3/4 max-w-md mb-6' onSubmit={handleCreateSubmit}>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Logrado:</p>
            <input type='number' name='achieved' min='0' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Día:</p>
            <input type='date' name='day' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <div className='bg-cyan-800 p-4 rounded-lg mb-4'>
            <h4 className='text-cyan-100 text-md mb-3'>Población por Género</h4>
            <div className='grid grid-cols-2 gap-3'>
              <label className='grid text-cyan-50'>
                <p className='text-cyan-50 text-sm'>SP Mujeres:</p>
                <input type='number' name='spFemale' min='0' defaultValue='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
              </label>
              <label className='grid text-cyan-50'>
                <p className='text-cyan-50 text-sm'>SP Hombres:</p>
                <input type='number' name='spMale' min='0' defaultValue='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
              </label>
              <label className='grid text-cyan-50'>
                <p className='text-cyan-50 text-sm'>F Mujeres:</p>
                <input type='number' name='fFemale' min='0' defaultValue='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
              </label>
              <label className='grid text-cyan-50'>
                <p className='text-cyan-50 text-sm'>F Hombres:</p>
                <input type='number' name='fMale' min='0' defaultValue='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
              </label>
              <label className='grid text-cyan-50'>
                <p className='text-cyan-50 text-sm'>NA Mujeres:</p>
                <input type='number' name='naFemale' min='0' defaultValue='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
              </label>
              <label className='grid text-cyan-50'>
                <p className='text-cyan-50 text-sm'>NA Hombres:</p>
                <input type='number' name='naMale' min='0' defaultValue='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
              </label>
              <label className='grid text-cyan-50'>
                <p className='text-cyan-50 text-sm'>P Mujeres:</p>
                <input type='number' name='pFemale' min='0' defaultValue='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
              </label>
              <label className='grid text-cyan-50'>
                <p className='text-cyan-50 text-sm'>P Hombres:</p>
                <input type='number' name='pMale' min='0' defaultValue='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
              </label>
            </div>
          </div>
          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>
            Crear nuevo
          </button>
        </form>

        <a href='/reports/history' className='mt-4 text-cyan-200 hover:text-white'>Finalizar</a>
      </section>
    </main>
  )
}

export default UpdateQuantitative
