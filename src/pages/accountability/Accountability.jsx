import { useParams } from 'react-router-dom'
import Data from '../../hooks/Data'

const Accountability = () => {
  const { idAccountability } = useParams()

  // Always call hooks in the same order, but pass null when idAccountability is not available
  const accountabilityLink = idAccountability ? `accountabilities/${idAccountability}` : null
  const surrendersLink = idAccountability ? `surrenders/accountability/${idAccountability}` : null

  const accountability = Data(accountabilityLink)
  const surrenders = Data(surrendersLink)

  // Fetch related data
  const projects = Data('projects')
  const users = Data('users')
  const activities = Data('activities')

  // Helper functions to get names by ID
  const getProjectName = (projectId) => {
    if (!projects.data || !projects.data[0] || !projects.data[0].list_projects || !projectId) return 'Cargando...'
    const project = projects.data[0].list_projects.find(p => p.id_project === projectId)
    return project ? project.name_project : 'Proyecto no encontrado'
  }

  const getUserName = (userId) => {
    if (!users.data || !userId) return 'Cargando...'
    const user = users.data.find(u => u.id_user === userId)
    return user ? user.name_user : 'Usuario no encontrado'
  }

  const getActivityName = (activityId) => {
    if (!activities.data || !activities.data[0] || !activities.data[0].list_activities || !activityId) return 'Cargando...'
    const activity = activities.data[0].list_activities.find(a => a.id_activity === activityId)
    return activity ? activity.activity : 'Actividad no encontrada'
  }

  // Calculate surrender totals
  const calculateTotals = (surrenderList) => {
    if (!surrenderList) return { totalBob: 0, totalUsd: 0, totalItems: 0 }
    return surrenderList.reduce((acc, surrender) => ({
      totalBob: acc.totalBob + (surrender.import_bob || 0),
      totalUsd: acc.totalUsd + (surrender.import_usd || 0),
      totalItems: acc.totalItems + 1
    }), { totalBob: 0, totalUsd: 0, totalItems: 0 })
  }

  // Don't render data if idAccountability is not available yet
  if (!idAccountability) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando rendición de cuentas...</h1>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6'>
        {/* Header */}
        <div className='text-center border-b-2 border-gray-300 pb-6'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>RENDICIÓN DE CUENTAS</h1>
          <h2 className='text-xl font-semibold text-blue-600'>
            {accountability.data ? getActivityName(accountability.data.read_accountability.id_activity) : 'Cargando...'}
          </h2>
        </div>

        {/* Loading and Error States */}
        {accountability.loading && (
          <div className='text-center py-8'>
            <p className='text-gray-500 italic text-lg'>Cargando rendición de cuentas...</p>
          </div>
        )}
        {accountability.error && (
          <div className='text-center py-8'>
            <p className='text-red-500 text-lg'>Error: {accountability.error}</p>
          </div>
        )}

        {/* Accountability Content */}
        {accountability.data && (
          <>
            {/* Información General */}
            <section className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-blue-500 pl-3'>
                Información General de la Rendición
              </h3>
              <div className='ml-6 space-y-2'>
                <p className='text-gray-600'>
                  <span className='font-medium'>Proyecto:</span> {getProjectName(accountability.data.read_accountability.id_project)}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Actividad:</span> {getActivityName(accountability.data.read_accountability.id_activity)}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Responsable:</span> {getUserName(accountability.data.read_accountability.id_user)}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Monto Total:</span>
                  <span className='text-green-600 font-semibold ml-2'>
                    {accountability.data.read_accountability.amount.toLocaleString()} Bs
                  </span>
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Fecha de Presentación:</span> {new Date(accountability.data.read_accountability.presentation).toLocaleDateString()}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Fecha de Recepción:</span> {accountability.data.read_accountability.reception}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Estado:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                    accountability.data.read_accountability.approved
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                  >
                    {accountability.data.read_accountability.approved ? 'Aprobada' : 'Pendiente de Aprobación'}
                  </span>
                </p>
              </div>
            </section>
          </>
        )}

        {/* Surrenders Details */}
        <section className='space-y-4 border-t pt-6'>
          <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-green-500 pl-3'>
            Detalle de Comprobantes (Surrenders)
          </h3>
          <div className='ml-6'>
            {surrenders.loading && (
              <p className='text-gray-500 italic'>Cargando comprobantes...</p>
            )}
            {surrenders.error && (
              <p className='text-red-500'>Error al cargar comprobantes: {surrenders.error}</p>
            )}
            {surrenders.data && surrenders.data[0] && surrenders.data[0].list_surrenders_by_accountability
              ? <div className='space-y-4'>
                {/* Surrenders Table */}
                <div className='overflow-x-auto'>
                  <table className='w-full border-collapse border border-gray-300'>
                    <thead>
                      <tr className='bg-gray-100'>
                        <th className='border border-gray-300 px-4 py-2 text-left'>Código</th>
                        <th className='border border-gray-300 px-4 py-2 text-left'>Descripción</th>
                        <th className='border border-gray-300 px-4 py-2 text-center'>Nro. Factura</th>
                        <th className='border border-gray-300 px-4 py-2 text-center'>Fecha Factura</th>
                        <th className='border border-gray-300 px-4 py-2 text-right'>Monto BOB</th>
                        <th className='border border-gray-300 px-4 py-2 text-right'>Monto USD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {surrenders.data[0].list_surrenders_by_accountability.map((surrender) => (
                        <tr key={surrender.id_surrender} className='hover:bg-gray-50'>
                          <td className='border border-gray-300 px-4 py-2 font-mono text-sm'>{surrender.code}</td>
                          <td className='border border-gray-300 px-4 py-2'>{surrender.description}</td>
                          <td className='border border-gray-300 px-4 py-2 text-center font-mono'>{surrender.invoice_number}</td>
                          <td className='border border-gray-300 px-4 py-2 text-center'>{surrender.date_invoice}</td>
                          <td className='border border-gray-300 px-4 py-2 text-right font-semibold text-green-600'>
                            {surrender.import_bob.toLocaleString()} Bs
                          </td>
                          <td className='border border-gray-300 px-4 py-2 text-right font-semibold text-blue-600'>
                            ${surrender.import_usd.toLocaleString()} USD
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Surrenders Summary */}
                <div className='bg-gray-50 p-6 rounded-lg border'>
                  <h4 className='font-semibold text-gray-800 mb-4'>Resumen de Comprobantes</h4>
                  {(() => {
                    const totals = calculateTotals(surrenders.data[0].list_surrenders_by_accountability)
                    return (
                      <>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                          <div className='bg-white p-4 rounded border text-center'>
                            <p className='text-2xl font-bold text-green-600'>{totals.totalBob.toLocaleString()}</p>
                            <p className='text-sm text-gray-600'>Total en Bolivianos</p>
                          </div>
                          <div className='bg-white p-4 rounded border text-center'>
                            <p className='text-2xl font-bold text-blue-600'>${totals.totalUsd.toLocaleString()}</p>
                            <p className='text-sm text-gray-600'>Total en Dólares</p>
                          </div>
                          <div className='bg-white p-4 rounded border text-center'>
                            <p className='text-2xl font-bold text-purple-600'>{totals.totalItems}</p>
                            <p className='text-sm text-gray-600'>Total de Comprobantes</p>
                          </div>
                        </div>

                        {/* Verification Status */}
                        {accountability.data && (
                          <div className='mt-4 pt-4 border-t border-gray-200'>
                            <h5 className='font-medium text-gray-700 mb-2'>Estado de Verificación</h5>
                            <div className='flex items-center justify-between bg-white p-4 rounded border'>
                              <div>
                                <p className='text-gray-600'>
                                  <span className='font-medium'>Monto Declarado:</span>
                                  <span className='ml-2 text-lg font-semibold text-gray-800'>
                                    {accountability.data.read_accountability.amount.toLocaleString()} Bs
                                  </span>
                                </p>
                                <p className='text-gray-600'>
                                  <span className='font-medium'>Monto Comprobado:</span>
                                  <span className='ml-2 text-lg font-semibold text-gray-800'>
                                    {totals.totalBob.toLocaleString()} Bs
                                  </span>
                                </p>
                              </div>
                              <div className='text-right'>
                                {(() => {
                                  const difference = accountability.data.read_accountability.amount - totals.totalBob
                                  const isExact = difference === 0
                                  const isOver = difference < 0
                                  return (
                                    <div className={`px-4 py-2 rounded-lg ${
                                      isExact
                                        ? 'bg-green-100 text-green-800'
                                        : isOver
                                          ? 'bg-red-100 text-red-800'
                                          : 'bg-yellow-100 text-yellow-800'
                                    }`}
                                    >
                                      <p className='font-semibold'>
                                        {isExact ? 'Exacto' : isOver ? 'Exceso' : 'Faltante'}
                                      </p>
                                      {!isExact && (
                                        <p className='text-sm'>
                                          {Math.abs(difference).toLocaleString()} Bs
                                        </p>
                                      )}
                                    </div>
                                  )
                                })()}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )
                  })()}
                </div>
              </div>
              : <p className='text-gray-500 italic'>No hay comprobantes disponibles.</p>}
          </div>
        </section>

        {/* Navigation */}
        <div className='border-t pt-6 text-center'>
          <a
            href='/accountability/history'
            className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
          >
            Volver al Historial
          </a>
        </div>
      </div>
    </main>
  )
}

export default Accountability
