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
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-400'>
      <h1>Crear Informe Cuantitativo</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label>
          Logrado:
          <input type='number' name='achieved' min='0' required />
        </label>
        <label>
          Fecha:
          <input type='date' name='day' required />
        </label>

        <h3>Población por Género y Edad</h3>
        <h4>Estudiantes de Primaria (SP)</h4>
        <label>
          SP Femenino:
          <input type='number' name='spFemale' min='0' defaultValue='0' />
        </label>
        <label>
          SP Masculino:
          <input type='number' name='spMale' min='0' defaultValue='0' />
        </label>

        <h4>Familias (F)</h4>
        <label>
          F Femenino:
          <input type='number' name='fFemale' min='0' defaultValue='0' />
        </label>
        <label>
          F Masculino:
          <input type='number' name='fMale' min='0' defaultValue='0' />
        </label>

        <h4>Niños y Adolescentes (NA)</h4>
        <label>
          NA Femenino:
          <input type='number' name='naFemale' min='0' defaultValue='0' />
        </label>
        <label>
          NA Masculino:
          <input type='number' name='naMale' min='0' defaultValue='0' />
        </label>

        <h4>Padres (P)</h4>
        <label>
          P Femenino:
          <input type='number' name='pFemale' min='0' defaultValue='0' />
        </label>
        <label>
          P Masculino:
          <input type='number' name='pMale' min='0' defaultValue='0' />
        </label>

        <button onClick={pushQuantitativeReport}>Agregar Reporte</button>
      </form>

      <section>
        <h2>Reportes Agregados</h2>
        {
          quantitativeReports.map((report, index) => (
            <div key={index}>
              <p>Logrado: {report.achieved}</p>
              <p>Fecha: {report.day}</p>
              <p>SP F: {report.spFemale}, SP M: {report.spMale}</p>
              <p>F F: {report.fFemale}, F M: {report.fMale}</p>
              <p>NA F: {report.naFemale}, NA M: {report.naMale}</p>
              <p>P F: {report.pFemale}, P M: {report.pMale}</p>
            </div>
          ))
        }
      </section>

      <button onClick={handleSubmit}>Subir Todos los Reportes</button>

      <section>
        <h2>Reportes Subidos</h2>
        {
          allQuantitativeReports.map((report, index) => (
            <div key={index}>
              <p>ID: {report.id_quantitative}</p>
              <p>Logrado: {report.achieved}</p>
              <p>Fecha: {report.day}</p>
              <p>SP F: {report.sp_female}, SP M: {report.sp_male}</p>
              <p>F F: {report.f_female}, F M: {report.f_male}</p>
              <p>NA F: {report.na_female}, NA M: {report.na_male}</p>
              <p>P F: {report.p_female}, P M: {report.p_male}</p>
            </div>
          ))
        }
      </section>
    </main>
  )
}

export default CreateQuantitative
