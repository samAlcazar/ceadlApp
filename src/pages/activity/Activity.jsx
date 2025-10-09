import { useParams } from 'react-router-dom'
import Data from '../../hooks/Data'

const Activity = () => {
  const { idActivity } = useParams()

  // Always call hooks in the same order, but pass null when idActivity is not available
  const activityLink = idActivity ? `activities/${idActivity}` : null
  const activity = Data(activityLink)

  // Don't render data if idActivity is not available yet
  if (!idActivity) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1>Cargando actividad...</h1>
      </main>
    )
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1>Detalle de la Actividad</h1>
      {activity.loading && <p>Cargando actividad...</p>}
      {activity.error && <p>Error: {activity.error}</p>}
      {activity.data && <p>{JSON.stringify(activity.data)}</p>}
    </main>
  )
}

export default Activity
