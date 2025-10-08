import Data from '../../hooks/Data'

const HistoryApplications = () => {
  const applications = Data('applications')

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Historial de aplicaciones</h1>
      {applications.loading && <p>Cargando...</p>}
      {applications.error && <p>Error: {applications.error}</p>}
      {applications.data && applications.data.length > 0 && (
        <div>
          {applications.data.map((item, index) => (
            <div key={index}>
              <h3>Aplicación {index + 1}</h3>
              <p>{JSON.stringify(item)}</p>
              <a href={`/applications/${item.id}`}>Ver detalle</a>
            </div>
          ))}
        </div>
      )}
      {applications.data && applications.data.length === 0 && (
        <p>No hay aplicaciones disponibles</p>
      )}
    </main>
  )
}

export default HistoryApplications
