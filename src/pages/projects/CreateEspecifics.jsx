const CreateEspecifics = () => {
  const handleSubmit = (e) => {
    e.preventDefault()

    const body = {
      numEspecific: parseInt(e.target.numEspecific.value),
      especific: e.target.especific.value,
      idProject: e.target.idProject.value
      // idUser vendrá del estado global
    }

    console.log(body)
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-400'>
      <h1>Crear objetivos específicos del proyecto</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label>
          Número de objetivo específico:
          <input type='number' name='numEspecific' min='1' max='5' required />
        </label>
        <label>
          Objetivo específico:
          <input type='text' name='especific' required />
        </label>
        <label>
          Proyecto:
          <select name='idProject' required>
            <option value=''>Seleccionar proyecto</option>
            <option value='f2ef50b0-5da7-40f4-a371-bde8653459a5'>Proyecto 1</option>
            <option value='project2'>Proyecto 2</option>
            <option value='project3'>Proyecto 3</option>
          </select>
        </label>
        <button type='submit'>Agregar</button>
      </form>
      <a href='/projectResults/create/asd'>Continúa en el paso 3</a>
    </main>
  )
}

export default CreateEspecifics
