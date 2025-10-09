import Data from '../../hooks/Data'

const HistoryReports = () => {
  const reports = Data('reports')
  const activities = Data('activities')

  const listData = reports.data ? reports.data[0].list_reports : []
  const activitiesList = activities.data ? activities.data[0].list_activities : []

  // Función para buscar el nombre de la actividad por ID
  const getActivityName = (idActivity) => {
    const activity = activitiesList.find(act => act.id_activity === idActivity)
    return activity ? activity.activity : 'N/A'
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[1200px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto px-6 py-8'>
        <h1 className='text-white text-2xl mb-8'>Historial de Informes</h1>
        <div className='w-full bg-cyan-800 rounded-lg p-6 overflow-x-auto'>
          <table className='w-full text-white'>
            <thead>
              <tr className='border-b border-cyan-600'>
                <th className='text-left py-3 px-4 text-cyan-100'>Nro</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Actividad</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Estado</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Fecha de Creación</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Temas Tratados</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                listData.map((report, index) => (
                  <tr key={report.id_report} className='border-b border-cyan-700 hover:bg-cyan-700 transition-colors'>
                    <td className='py-3 px-4'>{index + 1}</td>
                    <td className='py-3 px-4'>{getActivityName(report.id_activity)}</td>
                    <td className='py-3 px-4'>
                      <span className={`px-2 py-1 rounded-full text-xs ${report.approved ? 'bg-green-600 text-green-100' : 'bg-yellow-600 text-yellow-100'}`}>
                        {report.approved ? 'Aprobado' : 'Pendiente'}
                      </span>
                    </td>
                    <td className='py-3 px-4'>{report.presentation || 'N/A'}</td>
                    <td className='py-3 px-4'>{report.issues ? (report.issues.length > 50 ? report.issues.substring(0, 50) + '...' : report.issues) : 'N/A'}</td>
                    <td className='py-3 px-4'>
                      <div className='flex gap-2'>
                        <a
                          href={`/reports/update/${report.id_report}`}
                          className='text-cyan-200 hover:text-white text-sm underline'
                        >
                          Editar
                        </a>
                        <span className='text-cyan-400'>|</span>
                        <a
                          href={`/reports/delete/${report.id_report}`}
                          className='text-red-300 hover:text-red-100 text-sm underline'
                        >
                          Eliminar
                        </a>
                        <span className='text-cyan-400'>|</span>
                        <a
                          href={`/reports/${report.id_report}`}
                          className='text-cyan-200 hover:text-white text-sm underline'
                        >
                          Ver
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className='mt-6'>
          <a
            href='/reports/create'
            className='px-6 py-3 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white transition-colors'
          >
            Nuevo Informe
          </a>
        </div>
      </section>
    </main>
  )
}

export default HistoryReports
