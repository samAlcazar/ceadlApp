import { useParams } from 'react-router-dom'
import Data from '../../hooks/Data'

const Application = () => {
  const { idApplication } = useParams()
  // Always call hooks in the same order, but pass null when idApplication is not available
  const applicationLink = idApplication ? `applications/${idApplication}` : null
  const budgetsLink = idApplication ? `budgets/application/${idApplication}` : null
  const application = Data(applicationLink)
  const budgets = Data(budgetsLink)

  // Fetch related data
  const projects = Data('projects')
  const users = Data('users')
  const activities = Data('activities')
  const founders = Data('founders')

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

  const getFounderName = (founderId) => {
    if (!founders.data || !founderId) return 'Cargando...'
    const founder = founders.data.find(f => f.id_founder === founderId)
    return founder ? founder.name_founder : 'Financiador no encontrado'
  }

  // Calculate budget totals
  const calculateTotals = (budgetList) => {
    if (!budgetList) return { totalBob: 0, totalUsd: 0, totalItems: 0 }
    return budgetList.reduce((acc, budget) => ({
      totalBob: acc.totalBob + (budget.import_bob || 0),
      totalUsd: acc.totalUsd + (budget.import_usd || 0),
      totalItems: acc.totalItems + (budget.quantity || 0)
    }), { totalBob: 0, totalUsd: 0, totalItems: 0 })
  }

  // Don't render data if idApplication is not available yet
  if (!idApplication) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando aplicación...</h1>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6'>
        {/* Header */}
        <div className='text-center border-b-2 border-gray-300 pb-6'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>SOLICITUD DE PRESUPUESTO</h1>
          <h2 className='text-xl font-semibold text-blue-600'>
            {application.data ? getActivityName(application.data.read_application.id_activity) : 'Cargando...'}
          </h2>
        </div>

        {/* Loading and Error States */}
        {application.loading && (
          <div className='text-center py-8'>
            <p className='text-gray-500 italic text-lg'>Cargando solicitud...</p>
          </div>
        )}
        {application.error && (
          <div className='text-center py-8'>
            <p className='text-red-500 text-lg'>Error: {application.error}</p>
          </div>
        )}

        {/* Application Content */}
        {application.data && (
          <>
            {/* Información General */}
            <section className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-blue-500 pl-3'>
                Información General de la Solicitud
              </h3>
              <div className='ml-6 space-y-2'>
                <p className='text-gray-600'>
                  <span className='font-medium'>Proyecto:</span> {getProjectName(application.data.read_application.id_project)}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Actividad:</span> {getActivityName(application.data.read_application.id_activity)}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Solicitante:</span> {getUserName(application.data.read_application.id_user)}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Monto Solicitado:</span>
                  <span className='text-green-600 font-semibold ml-2'>
                    {application.data.read_application.amount.toLocaleString()} Bs
                  </span>
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Fecha de Presentación:</span> {new Date(application.data.read_application.presentation).toLocaleDateString()}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Estado:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                    application.data.read_application.approved
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                  >
                    {application.data.read_application.approved ? 'Aprobada' : 'Pendiente de Aprobación'}
                  </span>
                </p>
              </div>
            </section>
          </>
        )}

        {/* Budget Details */}
        <section className='space-y-4 border-t pt-6'>
          <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-green-500 pl-3'>
            Detalle del Presupuesto
          </h3>
          <div className='ml-6'>
            {budgets.loading && (
              <p className='text-gray-500 italic'>Cargando presupuestos...</p>
            )}
            {budgets.error && (
              <p className='text-red-500'>Error al cargar presupuestos: {budgets.error}</p>
            )}
            {budgets.data && budgets.data[0] && budgets.data[0].list_budgets_by_application
              ? <div className='space-y-4'>
                {/* Budget Items Table */}
                <div className='overflow-x-auto'>
                  <table className='w-full border-collapse border border-gray-300'>
                    <thead>
                      <tr className='bg-gray-100'>
                        <th className='border border-gray-300 px-4 py-2 text-left'>Código</th>
                        <th className='border border-gray-300 px-4 py-2 text-left'>Descripción</th>
                        <th className='border border-gray-300 px-4 py-2 text-center'>Cantidad</th>
                        <th className='border border-gray-300 px-4 py-2 text-center'>Financiador</th>
                        <th className='border border-gray-300 px-4 py-2 text-right'>Monto BOB</th>
                        <th className='border border-gray-300 px-4 py-2 text-right'>Monto USD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {budgets.data[0].list_budgets_by_application.map((budget) => (
                        <tr key={budget.id_budget} className='hover:bg-gray-50'>
                          <td className='border border-gray-300 px-4 py-2 font-mono text-sm'>{budget.code}</td>
                          <td className='border border-gray-300 px-4 py-2'>{budget.description}</td>
                          <td className='border border-gray-300 px-4 py-2 text-center'>{budget.quantity}</td>
                          <td className='border border-gray-300 px-4 py-2 text-sm'>{getFounderName(budget.id_founder)}</td>
                          <td className='border border-gray-300 px-4 py-2 text-right font-semibold text-green-600'>
                            {budget.import_bob.toLocaleString()} Bs
                          </td>
                          <td className='border border-gray-300 px-4 py-2 text-right font-semibold text-blue-600'>
                            ${budget.import_usd.toLocaleString()} USD
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Budget Summary */}
                <div className='bg-gray-50 p-6 rounded-lg border'>
                  <h4 className='font-semibold text-gray-800 mb-4'>Resumen del Presupuesto</h4>
                  {(() => {
                    const totals = calculateTotals(budgets.data[0].list_budgets_by_application)
                    return (
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
                          <p className='text-sm text-gray-600'>Total de Items</p>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>
              : <p className='text-gray-500 italic'>No hay presupuestos disponibles.</p>}
          </div>
        </section>

        {/* Navigation */}
        <div className='border-t pt-6 text-center'>
          <a
            href='/applications/history'
            className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
          >
            Volver al Historial
          </a>
        </div>
      </div>
    </main>
  )
}

export default Application
