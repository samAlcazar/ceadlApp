import { useState, useEffect } from 'react'
import Authorized from '../../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../../utils/url'

const CreateQuantitative = () => {
  const user = Authorized()
  const { idActivity } = useParams()
  const [allQuantitativeReports, setAllQuantitativeReports] = useState([])
  const [quantitativeReports, setQuantitativeReports] = useState([])

  // useEffect para ver cuando cambia el estado
  useEffect(() => {
    console.log('Reportes cuantitativos actualizados:', quantitativeReports)
  }, [quantitativeReports])

  const pushQuantitativeReport = (e) => {
    e.preventDefault()

    // Acceder al formulario desde el botón
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

    setQuantitativeReports([...quantitativeReports, body])

    // Limpiar el formulario después de agregar
    form.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`${URL}quantitatives/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quantitativeReports)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Reportes cuantitativos subidos con éxito:', data)
        setAllQuantitativeReports(data)
      })
      .catch((error) => {
        console.error('Error al subir los reportes cuantitativos:', error)
      })
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[700px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
        <h1 className='text-white text-2xl mb-8'>Crear Informe Cuantitativo</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-3/4 py-4'>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Logrado:</p>
            <input type='number' name='achieved' min='0' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>
          <label className='grid text-cyan-50 mb-4'>
            <p className='text-cyan-50'>Fecha:</p>
            <input type='date' name='day' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700' />
          </label>

          <h3 className='text-cyan-200 text-lg mt-4 mb-3'>Población por Género y Edad</h3>
          <div className='bg-cyan-800 p-4 rounded-lg mb-4'>
            <h4 className='text-cyan-100 text-md mb-3'>Estudiantes de Primaria (SP)</h4>
            <div className='grid grid-cols-2 gap-3'>
              <label className='grid text-cyan-50'>
                <p className='text-cyan-50'>SP Femenino:</p>
                <input type='number' name='spFemale' min='0' defaultValue='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
              </label>
              <label className='grid text-cyan-50'>
                <p className='text-cyan-50'>SP Masculino:</p>
                <input type='number' name='spMale' min='0' defaultValue='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
              </label>
            </div>
          </div>

          <div className='bg-cyan-800 p-4 rounded-lg mb-4'>
            <h4 className='text-cyan-100 text-md mb-3'>Familias (F)</h4>
            <div className='grid grid-cols-2 gap-3'>
              <label className='grid text-cyan-50'>
                <p className='text-cyan-50'>F Femenino:</p>
                <input type='number' name='fFemale' min='0' defaultValue='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
              </label>
              <label className='grid text-cyan-50'>
                <p className='text-cyan-50'>F Masculino:</p>
                <input type='number' name='fMale' min='0' defaultValue='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
              </label>
            </div>
          </div>

          <div className='bg-cyan-800 p-4 rounded-lg mb-4'>
            <h4 className='text-cyan-100 text-md mb-3'>Niños y Adolescentes (NA)</h4>
            <div className='grid grid-cols-2 gap-3'>
              <label className='grid text-cyan-50'>
                <p className='text-cyan-50'>NA Femenino:</p>
                <input type='number' name='naFemale' min='0' defaultValue='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
              </label>
              <label className='grid text-cyan-50'>
                <p className='text-cyan-50'>NA Masculino:</p>
                <input type='number' name='naMale' min='0' defaultValue='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
              </label>
            </div>
          </div>

          <div className='bg-cyan-800 p-4 rounded-lg mb-4'>
            <h4 className='text-cyan-100 text-md mb-3'>Padres (P)</h4>
            <div className='grid grid-cols-2 gap-3'>
              <label className='grid text-cyan-50'>
                <p className='text-cyan-50'>P Femenino:</p>
                <input type='number' name='pFemale' min='0' defaultValue='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
              </label>
              <label className='grid text-cyan-50'>
                <p className='text-cyan-50'>P Masculino:</p>
                <input type='number' name='pMale' min='0' defaultValue='0' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
              </label>
            </div>
          </div>

          <button onClick={pushQuantitativeReport} className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Agregar Reporte</button>
        </form>

        <section className='mt-4 w-3/4'>
          <h2 className='text-white text-lg mb-4'>Reportes Agregados</h2>
          <div className='flex flex-col gap-2 mb-4'>
            {
              quantitativeReports.map((report, index) => (
                <div key={index} className='bg-cyan-800 p-3 rounded-md'>
                  <p className='text-cyan-50'>Logrado: {report.achieved} | Fecha: {report.day}</p>
                  <p className='text-cyan-50'>SP F: {report.spFemale}, SP M: {report.spMale}</p>
                  <p className='text-cyan-50'>F F: {report.fFemale}, F M: {report.fMale}</p>
                  <p className='text-cyan-50'>NA F: {report.naFemale}, NA M: {report.naMale}</p>
                  <p className='text-cyan-50'>P F: {report.pFemale}, P M: {report.pMale}</p>
                </div>
              ))
            }
          </div>
        </section>

        <button onClick={handleSubmit} className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white'>Subir Todos los Reportes</button>

        <section className='mt-4 w-3/4 mb-8'>
          <h2 className='text-white text-lg mb-4'>Reportes Subidos</h2>
          <div className='flex flex-col gap-2'>
            {
              allQuantitativeReports.map((report, index) => (
                <div key={index} className='bg-cyan-800 p-3 rounded-md'>
                  <p className='text-cyan-50'>ID: {report.id_quantitative} | Logrado: {report.achieved} | Fecha: {report.day}</p>
                  <p className='text-cyan-50'>SP F: {report.sp_female}, SP M: {report.sp_male}</p>
                  <p className='text-cyan-50'>F F: {report.f_female}, F M: {report.f_male}</p>
                  <p className='text-cyan-50'>NA F: {report.na_female}, NA M: {report.na_male}</p>
                  <p className='text-cyan-50'>P F: {report.p_female}, P M: {report.p_male}</p>
                </div>
              ))
            }
          </div>
        </section>
      </section>
    </main>
  )
}

export default CreateQuantitative
