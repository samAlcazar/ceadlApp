import Card from '../../components/moleculas/Card'

const Home = () => {
  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Bienvenido a Ceadl App</h1>
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
          linkOne='applications/create'
          linkTwo=''
          aOne='Crear solicitud'
          aTwo='Historial de solicitudes'
        />
        <Card
          title='Rendiciones'
          linkOne='accountability/create'
          linkTwo=''
          aOne='Crear rendición'
          aTwo='Historial de rendiciones'
        />
      </section>
    </main>
  )
}

export default Home
