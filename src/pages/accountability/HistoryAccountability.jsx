import Data from '../../hooks/Data'

const HistoryAccountability = () => {
  const accountability = Data('accountabilities')
  const activities = Data('activities')

  const listData = accountability.data ? accountability.data[0].list_accountabilities : []
  const activitiesData = activities.data && activities.data[0] ? activities.data[0].list_activities : []

  // Función para obtener el nombre de la actividad por ID
  const getActivityName = (activityId) => {
    const activity = activitiesData.find(act => act.id_activity.toString() === activityId.toString())
    return activity ? activity.activity : 'Actividad no encontrada'
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[1000px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto px-6 py-8'>
        <h1 className='text-white text-2xl mb-8'>Historial de Rendición de Cuentas</h1>
        <div className='w-full bg-cyan-800 rounded-lg p-6 overflow-x-auto'>
          <table className='w-full text-white'>
            <thead>
              <tr className='border-b border-cyan-600'>
                <th className='text-left py-3 px-4 text-cyan-100'>Nro</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Monto</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Estado</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Actividad</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Fecha de Recepción</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                listData.map((item, index) => (
                  <tr key={item.id_accountability} className='border-b border-cyan-700 hover:bg-cyan-700 transition-colors'>
                    <td className='py-3 px-4'>{index + 1}</td>
                    <td className='py-3 px-4'>${item.amount || 'N/A'}</td>
                    <td className='py-3 px-4'>
                      <span className={`px-2 py-1 rounded-full text-xs ${item.approved ? 'bg-green-600 text-green-100' : 'bg-yellow-600 text-yellow-100'}`}>
                        {item.approved ? 'Aprobado' : 'Pendiente'}
                      </span>
                    </td>
                    <td className='py-3 px-4'>{getActivityName(item.id_activity)}</td>
                    <td className='py-3 px-4'>{item.reception || 'N/A'}</td>
                    <td className='py-3 px-4'>
                      <div className='flex gap-2'>
                        <a
                          href={`/accountability/update/${item.id_accountability}`}
                          className='text-cyan-200 hover:text-white text-sm underline'
                        >
                          Editar
                        </a>
                        <span className='text-cyan-400'>|</span>
                        <a
                          href={`/accountability/delete/${item.id_accountability}`}
                          className='text-red-300 hover:text-red-100 text-sm underline'
                        >
                          Eliminar
                        </a>
                        <span className='text-cyan-400'>|</span>
                        <a
                          href={`/print/accountability/${item.id_accountability}`}
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
      </section>
    </main>
  )
}

export default HistoryAccountability
