import { useParams } from 'react-router-dom'
import Data from '../../hooks/Data'

const Application = () => {
  const { idApplication } = useParams()
  // Always call hooks in the same order, but pass null when idApplication is not available
  const applicationLink = idApplication ? `applications/${idApplication}` : null
  const budgetsLink = idApplication ? `budgets/application/${idApplication}` : null
  const application = Data(applicationLink)
  const budgets = Data(budgetsLink)

  // Don't render data if idApplication is not available yet
  if (!idApplication) {
    return (
      <main>
        <h1>Cargando aplicación...</h1>
      </main>
    )
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Detalle de Aplicación</h1>
      {application.loading && <p>Cargando aplicación...</p>}
      {application.error && <p>Error: {application.error}</p>}
      {application.data && (
        <div>
          <h2>Información de la Aplicación</h2>
          <pre>{JSON.stringify(application.data)}</pre>
        </div>
      )}

      {budgets.loading && <p>Cargando presupuestos...</p>}
      {budgets.error && <p>Error al cargar presupuestos: {budgets.error}</p>}
      {budgets.data && (
        <div>
          <h2>Presupuestos de la Solicitud</h2>
          <pre>{JSON.stringify(budgets.data)}</pre>
        </div>
      )}

      <a href='/applications/history'>Volver al historial</a>
    </main>
  )
}

export default Application
