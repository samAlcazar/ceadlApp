import { useParams } from 'react-router-dom'
import Data from '../../hooks/Data'
const Project = () => {
  const { idProject } = useParams()
  // Always call hooks in the same order, but pass null when idProject is not available
  const projectLink = idProject ? `projects/${idProject}` : null
  const especificsLink = idProject ? `especifics/project/${idProject}` : null
  const projectResultsLink = idProject ? `projectResults/project/${idProject}` : null
  const projectActivitiesLink = idProject ? `projectActivities/project/${idProject}` : null
  const foundersLink = 'founders'
  const project = Data(projectLink)
  const especifics = Data(especificsLink)
  const projectResults = Data(projectResultsLink)
  const projectActivities = Data(projectActivitiesLink)
  const founders = Data(foundersLink)

  // Function to find founder name by ID
  const getFounderName = (founderId) => {
    if (!founders.data || !founderId) return 'Cargando...'
    const founder = founders.data.find(f => f.id_founder === founderId)
    return founder ? founder.name_founder : 'Financiador no encontrado'
  }

  // Don't render data if idProject is not available yet
  if (!idProject) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando proyecto...</h1>
      </main>
    )
  }
  return (
    <main className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6'>
        {/* Header */}
        <div className='text-center border-b-2 border-gray-300 pb-6'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>PROYECTO</h1>
          <h2 className='text-xl font-semibold text-blue-600'>
            {project.data && project.data.read_project.name_project}
          </h2>
        </div>

        {/* Detalles del Proyecto */}
        <section className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-blue-500 pl-3'>
            Detalles del Proyecto
          </h3>
          <div className='ml-6 space-y-2'>
            <p className='text-gray-600'>
              <span className='font-medium'>Financiador:</span> {project.data ? getFounderName(project.data.read_project.id_founder) : 'Cargando...'}
            </p>
            <p className='text-gray-600'>
              <span className='font-medium'>Fecha de Creación:</span> {project.data && project.data.read_project.create_project}
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
              {project.data && project.data.read_project.objetive_project}
            </p>
          </div>
        </section>

        {/* Específicos */}
        <section className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-purple-500 pl-3'>
            Objetivos Específicos
          </h3>
          <div className='ml-6'>
            {especifics.loading && (
              <p className='text-gray-500 italic'>Cargando específicos...</p>
            )}
            {especifics.error && (
              <p className='text-red-500'>Error: {especifics.error}</p>
            )}
            {especifics.data && especifics.data[0] && especifics.data[0].list_especifics_by_project
              ? (
                <ol className='list-decimal space-y-2'>
                  {especifics.data[0].list_especifics_by_project.map((especific) => (
                    <li key={especific.id_especific} className='text-gray-700 leading-relaxed text-justify'>
                      {especific.especific}
                    </li>
                  ))}
                </ol>
                )
              : <p className='text-gray-500 italic'>No hay específicos disponibles.</p>}
          </div>
        </section>

        {/* Resultados del Proyecto */}
        <section className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-orange-500 pl-3'>
            Resultados Esperados del Proyecto
          </h3>
          <div className='ml-6'>
            {projectResults.loading && (
              <p className='text-gray-500 italic'>Cargando resultados...</p>
            )}
            {projectResults.error && (
              <p className='text-red-500'>Error: {projectResults.error}</p>
            )}
            {projectResults.data && projectResults.data[0] && projectResults.data[0].list_project_results_by_project
              ? <ul className='list-disc space-y-2'>
                {projectResults.data[0].list_project_results_by_project.map((result) => (
                  <li key={result.id_project_result} className='text-gray-700 leading-relaxed text-justify'>
                    {result.project_result}
                  </li>
                ))}
                </ul>
              : <p className='text-gray-500 italic'>No hay resultados disponibles.</p>}
          </div>
        </section>

        {/* Actividades del Proyecto */}
        <section className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-700 border-l-4 border-red-500 pl-3'>
            Actividades del Proyecto
          </h3>
          <div className='ml-6'>
            {projectActivities.loading && (
              <p className='text-gray-500 italic'>Cargando actividades...</p>
            )}
            {projectActivities.error && (
              <p className='text-red-500'>Error: {projectActivities.error}</p>
            )}
            {projectActivities.data && projectActivities.data[0] && projectActivities.data[0].list_project_activities_by_project
              ? <div className='space-y-3'>
                {projectActivities.data[0].list_project_activities_by_project.map((activity, index) => (
                  <div key={activity.id_project_activity} className='bg-gray-50 p-4 rounded-lg border-l-4 border-gray-300'>
                    <p className='text-gray-700 leading-relaxed'>
                      <span className='font-medium text-gray-800'>Actividad {index + 1}:</span> {activity.project_activity}
                    </p>
                  </div>
                ))}
              </div>
              : <p className='text-gray-500 italic'>No hay actividades disponibles.</p>}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Project
