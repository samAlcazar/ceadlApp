import { useParams } from 'react-router-dom'
import Data from '../../hooks/Data'

const Report = () => {
  const { idReport } = useParams()

  // Always call hooks in the same order, but pass null when idReport is not available
  const reportLink = idReport ? `reports/${idReport}` : null
  const report = Data(reportLink)

  // Fetch related data
  const projects = Data('projects')
  const users = Data('users')
  const activities = Data('activities')

  // Only create quantitative link when report data is available
  const quantitativeLink = idReport && report.data?.read_report?.id_activity
    ? `quantitatives/activity/${report.data.read_report.id_activity}`
    : null
  const quantitative = Data(quantitativeLink)

  // Helper functions to get names by ID
  const getProjectName = (projectId) => {
    if (!projects.data || !projects.data[0] || !projects.data[0].list_projects || !projectId) return 'Cargando...'
    const project = projects.data[0].list_projects.find(p => p.id_project === projectId)
    return project ? project.name_project : 'Proyecto no encontrado'
  }

  const getUserName = (userId) => {
    if (!users.data || !users.data[0] || !users.data[0].list_users || !userId) return 'Cargando...'
    const user = users.data[0].list_users.find(u => u.id_user === userId)
    return user ? user.name_user : 'Usuario no encontrado'
  }

  const getActivityName = (activityId) => {
    if (!activities.data || !activities.data[0] || !activities.data[0].list_activities || !activityId) return 'Cargando...'
    const activity = activities.data[0].list_activities.find(a => a.id_activity === activityId)
    return activity ? activity.activity : 'Actividad no encontrada'
  }

  // Don't render data if idReport is not available yet
  if (!idReport) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando reporte...</h1>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6'>
        {/* Header */}
        <div className='text-center border-b-2 border-gray-300 pb-6'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>REPORTE DE ACTIVIDAD</h1>
          <h2 className='text-xl font-semibold text-blue-600'>
            {report.data ? getActivityName(report.data.read_report.id_activity) : 'Cargando...'}
          </h2>
        </div>

        {/* Loading and Error States */}
        {report.loading && (
          <div className='text-center py-8'>
            <p className='text-gray-500 italic text-lg'>Cargando reporte...</p>
          </div>
        )}
        {report.error && (
          <div className='text-center py-8'>
            <p className='text-red-500 text-lg'>Error: {report.error}</p>
          </div>
        )}

        {/* Report Content */}
        {report.data && (
          <>
            {/* Información General */}
            <section className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-blue-500 pl-3'>
                Información General
              </h3>
              <div className='ml-6 space-y-2'>
                <p className='text-gray-600'>
                  <span className='font-medium'>Proyecto:</span> {getProjectName(report.data.read_report.id_project)}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Actividad:</span> {getActivityName(report.data.read_report.id_activity)}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Responsable:</span> {getUserName(report.data.read_report.id_user)}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Fecha de Presentación:</span> {report.data.read_report.presentation}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Estado:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                    report.data.read_report.approved
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                  >
                    {report.data.read_report.approved ? 'Aprobado' : 'Pendiente de Aprobación'}
                  </span>
                </p>
              </div>
            </section>

            {/* Resultados */}
            <section className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-green-500 pl-3'>
                Resultados Obtenidos
              </h3>
              <div className='ml-6'>
                <p className='text-gray-700 leading-relaxed text-justify'>
                  {report.data.read_report.results}
                </p>
              </div>
            </section>

            {/* Obstáculos */}
            <section className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-orange-500 pl-3'>
                Obstáculos Encontrados
              </h3>
              <div className='ml-6'>
                <p className='text-gray-700 leading-relaxed text-justify'>
                  {report.data.read_report.obstacle}
                </p>
              </div>
            </section>

            {/* Problemas e Incidencias */}
            <section className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-red-500 pl-3'>
                Problemas e Incidencias
              </h3>
              <div className='ml-6'>
                <p className='text-gray-700 leading-relaxed text-justify'>
                  {report.data.read_report.issues}
                </p>
              </div>
            </section>

            {/* Conclusiones */}
            <section className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-purple-500 pl-3'>
                Conclusiones
              </h3>
              <div className='ml-6'>
                <p className='text-gray-700 leading-relaxed text-justify'>
                  {report.data.read_report.conclusions}
                </p>
              </div>
            </section>

            {/* Anexos */}
            <section className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-indigo-500 pl-3'>
                Anexos
              </h3>
              <div className='ml-6'>
                <p className='text-gray-700 leading-relaxed text-justify'>
                  {report.data.read_report.anexos}
                </p>
              </div>
            </section>
          </>
        )}

        {/* Datos Cuantitativos */}
        <section className='space-y-4 border-t pt-6'>
          <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-cyan-500 pl-3'>
            Datos Cuantitativos de Participación
          </h3>
          <div className='ml-6'>
            {quantitative.loading && (
              <p className='text-gray-500 italic'>Cargando datos cuantitativos...</p>
            )}
            {quantitative.error && (
              <p className='text-red-500'>Error: {quantitative.error}</p>
            )}
            {quantitative.data && quantitative.data[0] && quantitative.data[0].list_quantitatives_by_activity
              ? <div className='space-y-4'>
                {quantitative.data[0].list_quantitatives_by_activity.map((data) => (
                  <div key={data.id_quantitative} className='bg-gray-50 p-6 rounded-lg border'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      {/* Información General */}
                      <div>
                        <h4 className='font-semibold text-gray-800 mb-3'>Información General</h4>
                        <div className='space-y-2'>
                          <p className='text-gray-600'>
                            <span className='font-medium'>Fecha:</span> {data.day}
                          </p>
                          <p className='text-gray-600'>
                            <span className='font-medium'>Meta Alcanzada:</span> {data.achieved} participantes
                          </p>
                        </div>
                      </div>

                      {/* Participación por Género y Tipo */}
                      <div>
                        <h4 className='font-semibold text-gray-800 mb-3'>Participación por Género y Tipo</h4>
                        {/* Participantes Masculinos */}
                        <div className='mb-4'>
                          <h5 className='font-medium text-gray-700 mb-2'>Masculino</h5>
                          <div className='grid grid-cols-2 gap-2 text-sm'>
                            <p className='text-gray-600'>Familiares: <span className='font-medium'>{data.f_male}</span></p>
                            <p className='text-gray-600'>Personal Institución: <span className='font-medium'>{data.p_male}</span></p>
                            <p className='text-gray-600'>Niños/Adolescentes: <span className='font-medium'>{data.na_male}</span></p>
                            <p className='text-gray-600'>Servidores Públicos: <span className='font-medium'>{data.sp_male}</span></p>
                          </div>
                        </div>

                        {/* Participantes Femeninas */}
                        <div>
                          <h5 className='font-medium text-gray-700 mb-2'>Femenino</h5>
                          <div className='grid grid-cols-2 gap-2 text-sm'>
                            <p className='text-gray-600'>Familiares: <span className='font-medium'>{data.f_female}</span></p>
                            <p className='text-gray-600'>Personal Institución: <span className='font-medium'>{data.p_female}</span></p>
                            <p className='text-gray-600'>Niñas/Adolescentes: <span className='font-medium'>{data.na_female}</span></p>
                            <p className='text-gray-600'>Servidoras Públicas: <span className='font-medium'>{data.sp_female}</span></p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Resumen por Tipo de Participante */}
                    <div className='mt-4 pt-4 border-t border-gray-200'>
                      <h4 className='font-semibold text-gray-800 mb-2'>Resumen por Tipo de Participante</h4>
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
                        <div className='bg-white p-3 rounded border'>
                          <p className='text-2xl font-bold text-green-600'>{data.f_male + data.f_female}</p>
                          <p className='text-sm text-gray-600'>Familiares</p>
                        </div>
                        <div className='bg-white p-3 rounded border'>
                          <p className='text-2xl font-bold text-blue-600'>{data.p_male + data.p_female}</p>
                          <p className='text-sm text-gray-600'>Personal Institución</p>
                        </div>
                        <div className='bg-white p-3 rounded border'>
                          <p className='text-2xl font-bold text-yellow-600'>{data.na_male + data.na_female}</p>
                          <p className='text-sm text-gray-600'>Niños/Adolescentes</p>
                        </div>
                        <div className='bg-white p-3 rounded border'>
                          <p className='text-2xl font-bold text-red-600'>{data.sp_male + data.sp_female}</p>
                          <p className='text-sm text-gray-600'>Servidores Públicos</p>
                        </div>
                      </div>
                      {/* Total General */}
                      <div className='mt-4 text-center'>
                        <div className='bg-gray-800 text-white p-4 rounded-lg inline-block'>
                          <p className='text-3xl font-bold'>
                            {data.f_male + data.f_female + data.p_male + data.p_female + data.na_male + data.na_female + data.sp_male + data.sp_female}
                          </p>
                          <p className='text-sm'>Total de Participantes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              : <p className='text-gray-500 italic'>No hay datos cuantitativos disponibles.</p>}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Report
