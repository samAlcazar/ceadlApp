import Data from '../../hooks/Data'

const HistoryProjects = () => {
  const projects = Data('projects')

  const listData = projects.data ? projects.data[0].list_projects : []

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Historial de proyectos</h1>
      <table>
        <thead>
          <tr>
            <th>Nro</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            listData.map((project, index) => (
              <tr key={project.id_project}>
                <td>{index + 1}</td>
                <td>{project.name_project}</td>
                <td>
                  <a href={`/projects/update/${project.id_project}`}>Editar</a>
                  {' | '}
                  <a href={`/projects/delete/${project.id_project}`}>Eliminar</a>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </main>
  )
}

export default HistoryProjects
