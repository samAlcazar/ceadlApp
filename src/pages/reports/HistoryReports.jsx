import Data from '../../hooks/Data'

const HistoryReports = () => {
  const reports = Data('reports')

  const listData = reports.data ? reports.data[0].list_reports : []

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Historial de informes</h1>
      <table>
        <thead>
          <tr>
            <th>Nro</th>
            <th>Actividad</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            listData.map((report, index) => (
              <tr key={report.id_report}>
                <td>{index + 1}</td>
                <td>{report.id_activity || 'N/A'}</td>
                <td>{report.approved ? 'Aprobado' : 'Pendiente'}</td>
                <td>{report.presentation}</td>
                <td>
                  <a href={`/reports/update/${report.id_report}`}>Editar</a>
                  {' | '}
                  <a href={`/reports/delete/${report.id_report}`}>Eliminar</a>
                  {' | '}
                  <a href={`/reports/${report.id_report}`}>Ver</a>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </main>
  )
}

export default HistoryReports
