import { useParams } from 'react-router-dom'
import Data from '../../hooks/Data'

const Application = () => {
  const { idApplication } = useParams()
  // Always call hooks in the same order, but pass null when idApplication is not available
  const applicationLink = idApplication ? `applications/${idApplication}` : null
  const application = Data(applicationLink)

  // Don't render data if idApplication is not available yet
  if (!idApplication) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando aplicación...</h1>
      </main>
    )
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Detalle de Aplicación</h1>
      {application.loading && <p>Cargando aplicación...</p>}
      {application.error && <p>Error: {application.error}</p>}
      {application.data && <p>{JSON.stringify(application.data)}</p>}
    </main>
  )
}

export default Application
