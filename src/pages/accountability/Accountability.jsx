import { useParams } from 'react-router-dom'
import Data from '../../hooks/Data'

const Accountability = () => {
  const { idAccountability } = useParams()

  // Always call hooks in the same order, but pass null when idAccountability is not available
  const accountabilityLink = idAccountability ? `accountability/${idAccountability}` : null

  const accountability = Data(accountabilityLink)

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
      {accountability.data && <p>{JSON.stringify(accountability.data)}</p>}
    </main>
  )
}

export default Accountability
