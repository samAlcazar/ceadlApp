import Card from '../../components/moleculas/Card'

const Home = () => {
  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1 className='text-3xl font-bold mb-8'>Qué haremos hoy?</h1>
      <section className='grid grid-cols-3'>
        <Card
          title='Financiadores'
          linkOne='founders/create'
          linkTwo='founders/history'
          aOne='Crear financiador'
          aTwo='Historial de financiadores'
        />
        <Card
          title='Proyectos'
          linkOne='projects/create'
          linkTwo='projects/history'
          aOne='Crear proyecto'
          aTwo='Historial de proyectos'
        />
        <Card
          title='Actividades'
          linkOne='activities/create'
          linkTwo='activities/history'
          aOne='Crear actividad'
          aTwo='Historial de actividades'
        />
        <Card
          title='Informes'
          linkOne='reports/create'
          linkTwo='reports/history'
          aOne='Crear informe'
          aTwo='Historial de informes'
        />
        <Card
          title='Solicitudes'
          linkOne='applications/create'
          linkTwo='applications/history'
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
        <Card
          title='Participantes'
          linkOne='participants/create'
          linkTwo='participants/history'
          aOne='Crear participantes'
          aTwo='Historial de participantes'
        />
      </section>
    </main>
  )
}

export default Home
