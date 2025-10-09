import { useParams } from 'react-router-dom'
import Data from '../../hooks/Data'

const Accountability = () => {
  const { idAccountability } = useParams()

  // Always call hooks in the same order, but pass null when idAccountability is not available
  const accountabilityLink = idAccountability ? `accountabilities/${idAccountability}` : null
  const surrendersLink = idAccountability ? `surrenders/accountability/${idAccountability}` : null

  const accountability = Data(accountabilityLink)
  const surrenders = Data(surrendersLink)

  // Don't render data if idAccountability is not available yet
  if (!idAccountability) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando rendición de cuentas...</h1>
      </main>
    )
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Detalle de Rendición de Cuentas</h1>
      {accountability.loading && <p>Cargando rendición de cuentas...</p>}
      {accountability.error && <p>Error: {accountability.error}</p>}
      {accountability.data && (
        <div>
          <h2>Información de la Rendición</h2>
          <pre>{JSON.stringify(accountability.data)}</pre>
        </div>
      )}

      {surrenders.loading && <p>Cargando surrenders...</p>}
      {surrenders.error && <p>Error al cargar surrenders: {surrenders.error}</p>}
      {surrenders.data && (
        <div>
          <h2>Surrenders Vinculados</h2>
          <pre>{JSON.stringify(surrenders.data)}</pre>
        </div>
      )}

      <a href='/accountability/history'>Volver al historial</a>
    </main>
  )
}

export default Accountability
