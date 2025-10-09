import Data from '../../hooks/Data'

const HistoryUsers = () => {
  const users = Data('users')

  const listData = users.data ? users.data : []

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[1200px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto px-6 py-8'>
        <h1 className='text-white text-2xl mb-8'>Historial de Usuarios</h1>
        <div className='w-full bg-cyan-800 rounded-lg p-6 overflow-x-auto'>
          <table className='w-full text-white'>
            <thead>
              <tr className='border-b border-cyan-600'>
                <th className='text-left py-3 px-4 text-cyan-100'>Nro</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Nombre</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Nick</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Cargo</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Perfil</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Proyecto</th>
                <th className='text-left py-3 px-4 text-cyan-100'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                Array.isArray(listData) && listData.map((item, index) => (
                  <tr key={item.id_user} className='border-b border-cyan-700 hover:bg-cyan-700 transition-colors'>
                    <td className='py-3 px-4'>{index + 1}</td>
                    <td className='py-3 px-4'>{item.name_user || 'N/A'}</td>
                    <td className='py-3 px-4'>{item.nick_user || 'N/A'}</td>
                    <td className='py-3 px-4'>{item.charge_user || 'N/A'}</td>
                    <td className='py-3 px-4'>{item.id_profile || 'N/A'}</td>
                    <td className='py-3 px-4'>{item.id_project || 'Sin proyecto'}</td>
                    <td className='py-3 px-4'>
                      <div className='flex gap-2'>
                        <a
                          href={`/users/update/${item.id_user}`}
                          className='text-cyan-200 hover:text-white text-sm underline'
                        >
                          Editar
                        </a>
                        <span className='text-cyan-400'>|</span>
                        <a
                          href={`/users/delete/${item.id_user}`}
                          className='text-red-300 hover:text-red-100 text-sm underline'
                        >
                          Eliminar
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className='mt-6'>
          <a
            href='/users/create'
            className='px-6 py-3 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white transition-colors'
          >
            Nuevo Usuario
          </a>
        </div>
      </section>
    </main>
  )
}

export default HistoryUsers
