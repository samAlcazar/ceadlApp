import Card from '../../components/moleculas/Card'

const Home = () => {
  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-500'>
      <h1>Welcome to the Home Page</h1>
      <section className=' flex'>
        <Card
          title='Proyectos'
          linkOne='projects/create'
          linkTwo=''
          aOne='Crear proyecto'
          aTwo='Historial de proyectos'
        />
        <Card
          title='Actividades'
          linkOne='activities/create'
          linkTwo=''
          aOne='Crear actividad'
          aTwo='Historial de actividades'
        />
        <Card
          title='Informes'
          linkOne='reports/create'
          linkTwo=''
          aOne='Crear informe'
          aTwo='Historial de informes'
        />
        <Card
          title='Solicitudes'
          linkOne='requests/create'
          linkTwo=''
          aOne='Crear solicitud'
          aTwo='Historial de solicitudes'
        />
      </section>
    </main>
  )
}

export default Home
