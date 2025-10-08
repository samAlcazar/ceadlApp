import Data from '../../hooks/Data'

const HistoryApplications = () => {
  const applications = Data('applications')

  const listData = applications.data ? applications.data[0].list_applications : []

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Historial de aplicaciones</h1>
      <table>
        <thead>
          <tr>
            <th>Nro</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            listData.map((item, index) => (
              <tr key={item.id_application}>
                <td>{index + 1}</td>
                <td>${item.amount || 'N/A'}</td>
                <td>{item.approved ? 'Aprobado' : 'Pendiente'}</td>
                <td>{item.presentation}</td>
                <td>
                  <a href={`/applications/update/${item.id_application}`}>Editar</a>
                  {' | '}
                  <a href={`/applications/delete/${item.id_application}`}>Eliminar</a>
                  {' | '}
                  <a href={`/applications/${item.id_application}`}>Ver</a>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </main>
  )
}

export default HistoryApplications
