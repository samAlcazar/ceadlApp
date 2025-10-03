const Card = ({ title, linkOne, linkTwo, aOne, aTwo }) => {
  return (
    <div className='border p-4 m-4 flex flex-col gap-2'>
      <h2 className='text-lg font-semibold text-center'>{title}</h2>
      <a href={linkOne}>{aOne}</a>
      <a href={linkTwo}>{aTwo}</a>
    </div>
  )
}

export default Card
