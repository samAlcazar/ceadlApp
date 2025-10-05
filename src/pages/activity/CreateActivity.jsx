const CreateActivity = () => {
  const handleSubmit = (e) => {
    e.preventDefault()

    const body = {
      activity: e.target.activity.value,
      dateStart: e.target.dateStart.value,
      dateEnd: e.target.dateEnd.value,
      place: e.target.place.value,
      participantsExpected: parseInt(e.target.participantsExpected.value),
      objetive: e.target.objetive.value,
      resultExpected: e.target.resultExpected.value,
      descriptionActivity: e.target.descriptionActivity.value,
      idProject: e.target.idProject.value,
      idEspecific: e.target.idEspecific.value,
      idProjectResult: e.target.idProjectResult.value,
      idProjectActivity: e.target.idProjectActivity.value
      // idUser vendrá del estado global
    }

    console.log(body)
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-400'>
      <h1>CreateActivity</h1>
      <form onSubmit={handleSubmit} className='flex gap-4'>
        <div className='flex gap-4'>
          <fieldset>
            <legend>Datos de la Actividad</legend>
            <div className='flex flex-col gap-2'>
              <label>
                Actividad:
                <input type='text' name='activity' />
              </label>
              <label>
                Fecha de inicio:
                <input type='date' name='dateStart' />
              </label>
              <label>
                Fecha de fin:
                <input type='date' name='dateEnd' />
              </label>
              <label>
                Lugar:
                <input type='text' name='place' />
              </label>
              <label>
                Participantes esperados:
                <input type='number' name='participantsExpected' min='1' />
              </label>
              <label>
                Objetivo de la actividad:
                <textarea name='objetive' />
              </label>
              <label>
                Resultado esperado de la actividad:
                <textarea name='resultExpected' />
              </label>
              <label>
                Descripción de la actividad:
                <textarea name='descriptionActivity' />
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Datos del Proyecto</legend>
            <div className='flex flex-col gap-2'>
              <label>
                Proyecto
                <select name='idProject' required>
                  <option value=''>Seleccionar proyecto</option>
                  <option value='f2ef50b0-5da7-40f4-a371-bde8653459a5'>Proyecto 1</option>
                  <option value='project2'>Proyecto 2</option>
                  <option value='project3'>Proyecto 3</option>
                </select>
              </label>
              <label>
                Objetivo específico del proyecto
                <select name='idEspecific' required>
                  <option value=''>Seleccionar objetivo específico</option>
                  <option value='977137c7-53a7-4502-a072-3072e633bd71'>Objetivo 1</option>
                  <option value='especific2'>Objetivo 2</option>
                  <option value='especific3'>Objetivo 3</option>
                </select>
              </label>
              <label>
                Resultado esperado del proyecto
                <select name='idProjectResult' required>
                  <option value=''>Seleccionar resultado esperado</option>
                  <option value='d7172750-46fd-4cc5-ac71-2efeab6a527f'>Resultado 1</option>
                  <option value='result2'>Resultado 2</option>
                  <option value='result3'>Resultado 3</option>
                </select>
              </label>
              <label>
                Actividad del proyecto
                <select name='idProjectActivity' required>
                  <option value=''>Seleccionar actividad del proyecto</option>
                  <option value='c5141779-edcd-4d45-953f-d2e78b710389'>Actividad 1</option>
                  <option value='activity2'>Actividad 2</option>
                  <option value='activity3'>Actividad 3</option>
                </select>
              </label>
            </div>
          </fieldset>
        </div>
        <button type='submit'>Crear Actividad</button>
      </form>
    </main>
  )
}

export default CreateActivity
