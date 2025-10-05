const CreateAccountability = () => {
  const handleSubmit = (e) => {
    e.preventDefault()

    const body = {
      amount: parseFloat(e.target.amount.value),
      reception: e.target.reception.value,
      approved: e.target.approved.checked,
      idProject: e.target.idProject.value,
      idActivity: e.target.idActivity.value
      // idUser vendrá del estado global
    }

    console.log(body)
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-400'>
      <h1>Crear Rendición de Cuentas</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label>
          Monto (USD):
          <input
            type='number'
            name='amount'
            step='0.01'
            min='0'
            placeholder='0.00'
            required
          />
        </label>
        <label>
          Fecha de recepción:
          <input type='date' name='reception' required />
        </label>
        <label className='flex items-center gap-2'>
          <input type='checkbox' name='approved' />
          Aprobado
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
        <label>
          Actividad:
          <select name='idActivity' required>
            <option value=''>Seleccionar actividad</option>
            <option value='cc7a695b-f1dd-4ad8-9701-62e79f37295c'>Actividad 1</option>
            <option value='activity2'>Actividad 2</option>
            <option value='activity3'>Actividad 3</option>
          </select>
        </label>
        <button type='submit'>Crear Rendición de Cuentas</button>
      </form>
    </main>
  )
}

export default CreateAccountability
