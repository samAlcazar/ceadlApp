import Data from '../../hooks/Data'

const HistoryAccountability = () => {
  const accountability = Data('accountability')

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Historial de rendición de cuentas</h1>
      {accountability.loading && <p>Cargando...</p>}
      {accountability.error && <p>Error: {accountability.error}</p>}
      {accountability.data && accountability.data.length > 0 && (
        <div>
          {accountability.data.map((item, index) => (
            <div key={index}>
              <h3>Rendición {index + 1}</h3>
              <p>{JSON.stringify(item)}</p>
              <a href={`/accountability/${item.id}`}>Ver detalle</a>
            </div>
          ))}
        </div>
      )}
      {accountability.data && accountability.data.length === 0 && (
        <p>No hay rendiciones de cuentas disponibles</p>
      )}
    </main>
  )
}

export default HistoryAccountability
