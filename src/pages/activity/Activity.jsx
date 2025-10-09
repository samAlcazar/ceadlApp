import { useParams } from 'react-router-dom'
import Data from '../../hooks/Data'

const Activity = () => {
  const { idActivity } = useParams()

  // Always call hooks in the same order, but pass null when idActivity is not available
  const activityLink = idActivity ? `activities/${idActivity}` : null
  const activity = Data(activityLink)
  
  // Fetch related data
  const projects = Data('projects')
  const users = Data('users')
  const especifics = Data('especifics')
  const projectResults = Data('projectResults')
  const projectActivities = Data('projectActivities')

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

  const getEspecificName = (especificId) => {
    if (!especifics.data || !especifics.data[0] || !especifics.data[0].list_especifics || !especificId) return 'Cargando...'
    const especific = especifics.data[0].list_especifics.find(e => e.id_especific === especificId)
    return especific ? especific.especific : 'Específico no encontrado'
  }

  const getProjectResultName = (resultId) => {
    if (!projectResults.data || !projectResults.data[0] || !projectResults.data[0].list_project_results || !resultId) return 'Cargando...'
    const result = projectResults.data[0].list_project_results.find(r => r.id_project_result === resultId)
    return result ? result.project_result : 'Resultado no encontrado'
  }

  const getProjectActivityName = (activityId) => {
    if (!projectActivities.data || !projectActivities.data[0] || !projectActivities.data[0].list_project_activities || !activityId) return 'Cargando...'
    const projectActivity = projectActivities.data[0].list_project_activities.find(a => a.id_project_activity === activityId)
    return projectActivity ? projectActivity.project_activity : 'Actividad de proyecto no encontrada'
  }

  // Don't render data if idActivity is not available yet
  if (!idActivity) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando actividad...</h1>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6'>
        {/* Header */}
        <div className='text-center border-b-2 border-gray-300 pb-6'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>ACTIVIDAD</h1>
          <h2 className='text-xl font-semibold text-blue-600'>
            {activity.data && activity.data.read_activity.activity}
          </h2>
        </div>

        {/* Loading and Error States */}
        {activity.loading && (
          <div className='text-center py-8'>
            <p className='text-gray-500 italic text-lg'>Cargando actividad...</p>
          </div>
        )}
        {activity.error && (
          <div className='text-center py-8'>
            <p className='text-red-500 text-lg'>Error: {activity.error}</p>
          </div>
        )}

        {/* Activity Content */}
        {activity.data && (
          <>
            {/* Detalles de la Actividad */}
            <section className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-blue-500 pl-3'>
                Detalles de la Actividad
              </h3>
              <div className='ml-6 space-y-2'>
                <p className='text-gray-600'>
                  <span className='font-medium'>Nombre:</span> {activity.data.read_activity.activity}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Descripción:</span> {activity.data.read_activity.description_activity}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Lugar:</span> {activity.data.read_activity.place}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Fecha de Inicio:</span> {activity.data.read_activity.date_start}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Fecha de Fin:</span> {activity.data.read_activity.date_end}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Participantes Esperados:</span> {activity.data.read_activity.participants_expected}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Fecha de Creación:</span> {new Date(activity.data.read_activity.create_activity).toLocaleDateString()}
                </p>
              </div>
            </section>

            {/* Objetivos */}
            <section className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-green-500 pl-3'>
                Objetivos
              </h3>
              <div className='ml-6'>
                <p className='text-gray-700 leading-relaxed text-justify'>
                  {activity.data.read_activity.objetive}
                </p>
              </div>
            </section>

            {/* Resultados Esperados */}
            <section className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-orange-500 pl-3'>
                Resultados Esperados
              </h3>
              <div className='ml-6'>
                <p className='text-gray-700 leading-relaxed text-justify'>
                  {activity.data.read_activity.result_expected}
                </p>
              </div>
            </section>

            {/* Referencias Relacionadas */}
            <section className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-purple-500 pl-3'>
                Referencias Relacionadas
              </h3>
              <div className='ml-6 space-y-2'>
                <p className='text-gray-600'>
                  <span className='font-medium'>Proyecto:</span> {getProjectName(activity.data.read_activity.id_project)}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Usuario Responsable:</span> {getUserName(activity.data.read_activity.id_user)}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Objetivo Específico:</span> {getEspecificName(activity.data.read_activity.id_especific)}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Resultado del Proyecto:</span> {getProjectResultName(activity.data.read_activity.id_project_result)}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Actividad del Proyecto:</span> {getProjectActivityName(activity.data.read_activity.id_project_activity)}
                </p>
              </div>
            </section>

            {/* Información Adicional */}
            {activity.data.read_activity.additional_info && (
              <section className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-green-500 pl-3'>
                  Información Adicional
                </h3>
                <div className='ml-6'>
                  <p className='text-gray-700 leading-relaxed text-justify'>
                    {activity.data.read_activity.additional_info}
                  </p>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default Activity
