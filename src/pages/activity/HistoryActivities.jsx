import Data from '../../hooks/Data'

const HistoryActivities = () => {
  const activities = Data('activities')

  const listData = activities.data ? activities.data[0].list_activities : []

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[1200px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto px-6 py-8'>
        <h1 className='text-white text-2xl mb-8'>Historial de Actividades</h1>
        <div className='w-full bg-cyan-800 rounded-lg p-6 overflow-x-auto'>
          <table className='w-full text-white'>
            <thead>
              <tr className='border-b border-cyan-600'>
                <th className='text-left py-3 px-4 text-cyan-100'>Nro</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Actividad</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Fecha Inicio</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Fecha Fin</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Lugar</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Participantes</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                listData.map((item, index) => (
                  <tr key={item.id_activity} className='border-b border-cyan-700 hover:bg-cyan-700 transition-colors'>
                    <td className='py-3 px-4'>{index + 1}</td>
                    <td className='py-3 px-4'>{item.activity || 'N/A'}</td>
                    <td className='py-3 px-4'>{item.date_start || 'N/A'}</td>
                    <td className='py-3 px-4'>{item.date_end || 'N/A'}</td>
                    <td className='py-3 px-4'>{item.place || 'N/A'}</td>
                    <td className='py-3 px-4'>{item.participants_expected || 'N/A'}</td>
                    <td className='py-3 px-4'>
                      <div className='flex gap-2'>
                        <a
                          href={`/activities/update/${item.id_activity}`}
                          className='text-cyan-200 hover:text-white text-sm underline'
                        >
                          Editar
                        </a>
                        <span className='text-cyan-400'>|</span>
                        <a
                          href={`/activities/delete/${item.id_activity}`}
                          className='text-red-300 hover:text-red-100 text-sm underline'
                        >
                          Eliminar
                        </a>
                        <span className='text-cyan-400'>|</span>
                        <a
                          href={`/activities/${item.id_activity}`}
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
            href='/activities/create'
            className='px-6 py-3 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white transition-colors'
          >
            Nueva Actividad
          </a>
        </div>
      </section>
    </main>
  )
}

export default HistoryActivities
