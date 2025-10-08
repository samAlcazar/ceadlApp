import Data from '../../hooks/Data'

const HistoryAccountability = () => {
  const accountability = Data('accountability')

  const listData = accountability.data ? accountability.data[0].list_accountability : []

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Historial de rendición de cuentas</h1>
      <table>
        <thead>
          <tr>
            <th>Nro</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Fecha de Recepción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            listData.map((item, index) => (
              <tr key={item.id_accountability}>
                <td>{index + 1}</td>
                <td>${item.amount || 'N/A'}</td>
                <td>{item.approved ? 'Aprobado' : 'Pendiente'}</td>
                <td>{item.reception}</td>
                <td>
                  <a href={`/accountability/update/${item.id_accountability}`}>Editar</a>
                  {' | '}
                  <a href={`/accountability/delete/${item.id_accountability}`}>Eliminar</a>
                  {' | '}
                  <a href={`/accountability/${item.id_accountability}`}>Ver</a>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </main>
  )
}

export default HistoryAccountability
