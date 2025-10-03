const Home = () => {
  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-500'>
      <h1>Welcome to the Home Page</h1>
      <section className=' flex'>
        <div className='border p-4 m-4 flex flex-col gap-2'>
          <h2>Actividades</h2>
          <a href='activities/create'>Crear actividad</a>
          <a href=''>Historial de actividades</a>
        </div>
        <div className='border p-4 m-4 flex flex-col gap-2'>
          <h2>Informes</h2>
          <a href=''>Crear informe</a>
          <a href=''>Historial de informes</a>
        </div>
        <div className='border p-4 m-4 flex flex-col gap-2'>
          <h2>Solicitudes</h2>
          <a href=''>Crear solicitud</a>
          <a href=''>Historial de solicitudes</a>
        </div>
        <div className='border p-4 m-4 flex flex-col gap-2'>
          <h2>Rendiciones</h2>
          <a href=''>Crear rendición</a>
          <a href=''>Historial de rendiciones</a>
        </div>
        <div className='border p-4 m-4 flex flex-col gap-2'>
          <h2>Proyectos</h2>
          <a href='projects/create'>Crear proyecto</a>
          <a href=''>Historial de proyectos</a>
        </div>
      </section>
    </main>
  )
}

export default Home
