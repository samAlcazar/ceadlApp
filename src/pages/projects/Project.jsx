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
  console.log('ID del proyecto:', idProject)
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
      <p>{JSON.stringify(project.data)}</p>
      <h2>Específicos</h2>
      <p>{JSON.stringify(especifics.data[0].list_especifics_by_project)}</p>
      <h2>Resultados del Proyecto</h2>
      <p>{JSON.stringify(projectResults.data[0].list_project_results_by_project)}</p>
      <h2>Actividades del Proyecto</h2>
      <p>{JSON.stringify(projectActivities.data[0].list_project_activities_by_project)}</p>
    </main>
  )
}

export default Project
