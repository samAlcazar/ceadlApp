const Card = ({ title, linkOne, linkTwo, aOne, aTwo }) => {
  return (
    <div className='w-[250px] py-4 m-4 flex flex-col gap-2 rounded-2xl bg-gradient-to-t from-cyan-900 to-cyan-700 text-white text-center'>
      <h2 className='text-lg font-semibold block w-full bg-gradient-to-t from-cyan-700 to-cyan-900'>{title}</h2>
      <a href={linkOne} className='hover:underline'>{aOne}</a>
      <a href={linkTwo} className='hover:underline'>{aTwo}</a>
    </div>
  )
}

export default Card
