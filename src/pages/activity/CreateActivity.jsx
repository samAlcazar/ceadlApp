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
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[800px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
        <h1 className='text-white text-2xl mb-8'>Crear Actividad</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-full px-8 py-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <fieldset className='border border-cyan-300 rounded-lg p-4'>
              <legend className='text-cyan-50 px-2'>Datos de la Actividad</legend>
              <div className='flex flex-col gap-4'>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Actividad:</p>
                  <input type='text' name='activity' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Fecha de inicio:</p>
                  <input type='date' name='dateStart' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Fecha de fin:</p>
                  <input type='date' name='dateEnd' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Lugar:</p>
                  <input type='text' name='place' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Participantes esperados:</p>
                  <input type='number' name='participantsExpected' min='1' className='px-2 py-1 mt-1 rounded-md bg-cyan-700' />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Objetivo de la actividad:</p>
                  <textarea name='objetive' className='px-2 py-1 mt-1 rounded-md bg-cyan-700 h-20' />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Resultado esperado de la actividad:</p>
                  <textarea name='resultExpected' className='px-2 py-1 mt-1 rounded-md bg-cyan-700 h-20' />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Descripción de la actividad:</p>
                  <textarea name='descriptionActivity' className='px-2 py-1 mt-1 rounded-md bg-cyan-700 h-20' />
                </label>
              </div>
            </fieldset>
            <fieldset className='border border-cyan-300 rounded-lg p-4'>
              <legend className='text-cyan-50 px-2'>Datos del Proyecto</legend>
              <div className='flex flex-col gap-4'>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Proyecto:</p>
                  <select name='idProject' required className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white'>
                    <option value=''>Seleccionar proyecto</option>
                    <option value='f2ef50b0-5da7-40f4-a371-bde8653459a5'>Proyecto 1</option>
                    <option value='project2'>Proyecto 2</option>
                    <option value='project3'>Proyecto 3</option>
                  </select>
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Objetivo específico del proyecto:</p>
                  <select name='idEspecific' required className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white'>
                    <option value=''>Seleccionar objetivo específico</option>
                    <option value='977137c7-53a7-4502-a072-3072e633bd71'>Objetivo 1</option>
                    <option value='especific2'>Objetivo 2</option>
                    <option value='especific3'>Objetivo 3</option>
                  </select>
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Resultado esperado del proyecto:</p>
                  <select name='idProjectResult' required className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white'>
                    <option value=''>Seleccionar resultado esperado</option>
                    <option value='d7172750-46fd-4cc5-ac71-2efeab6a527f'>Resultado 1</option>
                    <option value='result2'>Resultado 2</option>
                    <option value='result3'>Resultado 3</option>
                  </select>
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Actividad del proyecto:</p>
                  <select name='idProjectActivity' required className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white'>
                    <option value=''>Seleccionar actividad del proyecto</option>
                    <option value='c5141779-edcd-4d45-953f-d2e78b710389'>Actividad 1</option>
                    <option value='activity2'>Actividad 2</option>
                    <option value='activity3'>Actividad 3</option>
                  </select>
                </label>
              </div>
            </fieldset>
          </div>
          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white w-full'>Crear Actividad</button>
        </form>
      </section>
    </main>
  )
}

export default CreateActivity
