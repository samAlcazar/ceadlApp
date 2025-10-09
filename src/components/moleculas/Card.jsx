const Card = ({ title, linkOne, linkTwo, linkThree, aOne, aTwo, aThree, icon }) => {
  return (
    <div className='group w-[220px] m-3 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden'>
      {/* Header con gradiente */}
      <div className='bg-gradient-to-r from-cyan-600 to-cyan-800 p-4 text-white relative'>
        <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300' />
        <div className='relative z-10 flex items-center justify-center gap-2'>
          {icon && (
            <div className='text-lg'>
              {icon}
            </div>
          )}
          <h2 className='text-lg font-bold text-center leading-tight'>
            {title}
          </h2>
        </div>
      </div>

      {/* Contenido */}
      <div className='p-4 space-y-3'>
        {aOne && linkOne && (
          <a
            href={linkOne}
            className='block w-full py-2 px-3 text-gray-700 bg-gray-50 rounded-md hover:bg-cyan-50 hover:text-cyan-700 transition-all duration-200 text-center font-medium border border-transparent hover:border-cyan-200 text-sm'
          >
            {aOne}
          </a>
        )}
        {aTwo && linkTwo && (
          <a
            href={linkTwo}
            className='block w-full py-2 px-3 text-gray-700 bg-gray-50 rounded-md hover:bg-cyan-50 hover:text-cyan-700 transition-all duration-200 text-center font-medium border border-transparent hover:border-cyan-200 text-sm'
          >
            {aTwo}
          </a>
        )}
        {aThree && linkThree && (
          <a
            href={linkThree}
            className='block w-full py-2 px-3 text-gray-700 bg-gray-50 rounded-md hover:bg-cyan-50 hover:text-cyan-700 transition-all duration-200 text-center font-medium border border-transparent hover:border-cyan-200 text-sm'
          >
            {aThree}
          </a>
        )}
      </div>
    </div>
  )
}

export default Card
