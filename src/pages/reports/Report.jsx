import { useParams } from 'react-router-dom'
import Data from '../../hooks/Data'

const Report = () => {
  const { idReport } = useParams()

  // Always call hooks in the same order, but pass null when idReport is not available
  const reportLink = idReport ? `reports/${idReport}` : null
  const report = Data(reportLink)

  // Only create quantitative link when report data is available
  const quantitativeLink = idReport && report.data?.read_report?.id_activity
    ? `quantitatives/activity/${report.data.read_report.id_activity}`
    : null
  const quantitative = Data(quantitativeLink)

  // Don't render data if idReport is not available yet
  if (!idReport) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando reporte...</h1>
      </main>
    )
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Detalle del Reporte</h1>
      {report.loading && <p>Cargando reporte...</p>}
      {report.error && <p>Error: {report.error}</p>}
      {report.data && <p>{JSON.stringify(report.data)}</p>}

      <h2>Datos Cuantitativos</h2>
      {quantitative.loading && <p>Cargando datos cuantitativos...</p>}
      {quantitative.error && <p>Error: {quantitative.error}</p>}
      {quantitative.data && quantitative.data[0] && (
        <p>{JSON.stringify(quantitative.data[0])}</p>
      )}
    </main>
  )
}

export default Report
