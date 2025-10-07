import { useParams } from 'react-router-dom'
import Data from '../../hooks/Data'
const Project = () => {
  const { idProject } = useParams()
  // Always call hooks in the same order, but pass null when idProject is not available
  const projectLink = idProject ? `projects/${idProject}` : null
  const especificsLink = idProject ? `especifics/project/${idProject}` : null
  const projectResultsLink = idProject ? `projectResults/project/${idProject}` : null
  const projectActivitiesLink = idProject ? `projectActivities/project/${idProject}` : null
  const project = Data(projectLink)
  const especifics = Data(especificsLink)
  const projectResults = Data(projectResultsLink)
  const projectActivities = Data(projectActivitiesLink)

  // Don't render data if idProject is not available yet
  if (!idProject) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando proyecto...</h1>
      </main>
    )
  }
  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Detalle del Proyecto</h1>
      {project.loading && <p>Cargando proyecto...</p>}
      {project.error && <p>Error: {project.error}</p>}
      {project.data && <p>{JSON.stringify(project.data)}</p>}

      <h2>Específicos</h2>
      {especifics.loading && <p>Cargando específicos...</p>}
      {especifics.error && <p>Error: {especifics.error}</p>}
      {especifics.data && especifics.data[0] && (
        <p>{JSON.stringify(especifics.data[0].list_especifics_by_project)}</p>
      )}

      <h2>Resultados del Proyecto</h2>
      {projectResults.loading && <p>Cargando resultados...</p>}
      {projectResults.error && <p>Error: {projectResults.error}</p>}
      {projectResults.data && projectResults.data[0] && (
        <p>{JSON.stringify(projectResults.data[0].list_project_results_by_project)}</p>
      )}

      <h2>Actividades del Proyecto</h2>
      {projectActivities.loading && <p>Cargando actividades...</p>}
      {projectActivities.error && <p>Error: {projectActivities.error}</p>}
      {projectActivities.data && projectActivities.data[0] && (
        <p>{JSON.stringify(projectActivities.data[0].list_project_activities_by_project)}</p>
      )}
    </main>
  )
}

export default Project
