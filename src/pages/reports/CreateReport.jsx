import Authorized from '../../hooks/Authorized'

const CreateReport = () => {
  const user = Authorized()
  const handleSubmit = (e) => {
    e.preventDefault()

    const body = {
      issues: e.target.issues.value,
      results: e.target.results.value,
      obstacle: e.target.obstacle.value,
      conclusions: e.target.conclusions.value,
      anexos: e.target.anexos.value,
      approved: e.target.approved.checked,
      idProject: e.target.idProject.value,
      idActivity: e.target.idActivity.value,
      idUser: user.idUser
    }

    console.log(body)
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-400'>
      <h1>Crear Reporte</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label>
          Problemas encontrados:
          <textarea name='issues' rows='3' placeholder='Describe los problemas técnicos o dificultades encontradas' />
        </label>
        <label>
          Resultados obtenidos:
          <textarea name='results' rows='3' placeholder='Describe los resultados alcanzados' />
        </label>
        <label>
          Obstáculos:
          <textarea name='obstacle' rows='3' placeholder='Describe los obstáculos enfrentados' />
        </label>
        <label>
          Conclusiones:
          <textarea name='conclusions' rows='3' placeholder='Conclusiones del reporte' />
        </label>
        <label>
          Anexos:
          <textarea name='anexos' rows='2' placeholder='Documentos adjuntos o referencias' />
        </label>
        <label className='flex items-center gap-2'>
          <input type='checkbox' name='approved' />
          Aprobado
        </label>
        <label>
          Proyecto:
          <select name='idProject'>
            <option value=''>Seleccionar proyecto</option>
            <option value='f2ef50b0-5da7-40f4-a371-bde8653459a5'>Proyecto 1</option>
            <option value='project2'>Proyecto 2</option>
            <option value='project3'>Proyecto 3</option>
          </select>
        </label>
        <label>
          Actividad:
          <select name='idActivity'>
            <option value=''>Seleccionar actividad</option>
            <option value='cc7a695b-f1dd-4ad8-9701-62e79f37295c'>Actividad 1</option>
            <option value='activity2'>Actividad 2</option>
            <option value='activity3'>Actividad 3</option>
          </select>
        </label>
        <button type='submit'>Crear Reporte</button>
      </form>
    </main>
  )
}

export default CreateReport
