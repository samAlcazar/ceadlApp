const CreateProject = () => {
  const handleSubmit = (e) => {
    e.preventDefault()

    const body = {
      codProject: e.target.codProject.value,
      nameProject: e.target.nameProject.value,
      objetiveProject: e.target.objetiveProject.value,
      idFounder: e.target.idFounder.value
      // idUser vendrá del estado global
    }

    console.log(body)
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-400'>
      <h1>Crear proyecto</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label>
          Código del proyecto:
          <input type='text' name='codProject' />
        </label>
        <label>
          Nombre del proyecto:
          <input type='text' name='nameProject' />
        </label>
        <label>
          Objetivo del proyecto:
          <input type='text' name='objetiveProject' />
        </label>
        <label>
          Financiador:
          <select name='idFounder' required>
            <option value=''>Seleccionar financiador</option>
            <option value='5a3b5272-084d-4f95-a9d1-5e516ef82bb7'>Financiador 1</option>
            <option value='founder2'>Financiador 2</option>
            <option value='founder3'>Financiador 3</option>
          </select>
        </label>
        <button type='submit'>Crear proyecto</button>
      </form>
      <a href='/especifics/create/asd'>Continúa en el paso 2</a>
    </main>
  )
}

export default CreateProject
