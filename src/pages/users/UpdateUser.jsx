import Data from '../../hooks/Data'
import Authorized from '../../hooks/Authorized'
import { useParams } from 'react-router-dom'
import { URL } from '../../../utils/url'
import { useState } from 'react'

const UpdateUser = () => {
  const user = Authorized()
  const { idUser } = useParams()
  const [newUser, setNewUser] = useState(null)

  const userLink = idUser ? `users/${idUser}` : null
  const userData = Data(userLink)
  const profiles = Data('profiles')
  const projects = Data('projects')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!user || !user.idUser) {
      console.error('Usuario no autenticado')
      return
    }

    const body = {
      nameUser: e.target.nameUser.value,
      nickUser: e.target.nickUser.value,
      passwordUser: e.target.passwordUser.value,
      chargeUser: e.target.chargeUser.value,
      signatureUser: e.target.signatureUser.value,
      idProfile: e.target.idProfile.value,
      idProject: e.target.idProject.value || null,
      idUser: user.idUser
    }

    fetch(`${URL}users/${idUser}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el usuario')
        }
        return response.json()
      })
      .then(data => {
        console.log('Usuario actualizado:', data)
        setNewUser(data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const profilesList = profiles.data ? profiles.data : []
  const projectsList = projects.data ? projects.data[0]?.list_projects : []

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[1200px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto'>
        <h1 className='text-white text-2xl mb-8'>Actualizar Usuario</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-full px-8 py-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <fieldset className='border border-cyan-300 rounded-lg p-4'>
              <legend className='text-cyan-50 px-2'>Datos del Usuario</legend>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Nombre del Usuario:</p>
                  <input
                    type='text'
                    name='nameUser'
                    required
                    defaultValue={userData.data?.name_user || ''}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white'
                    placeholder='Ej: Samuel Alcazar'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Nick del Usuario:</p>
                  <input
                    type='text'
                    name='nickUser'
                    required
                    defaultValue={userData.data?.nick_user || ''}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white'
                    placeholder='Ej: saalcazar'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Contraseña:</p>
                  <input
                    type='password'
                    name='passwordUser'
                    required
                    defaultValue={userData.data?.password_user || ''}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white'
                    placeholder='Contraseña'
                  />
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Cargo:</p>
                  <input
                    type='text'
                    name='chargeUser'
                    required
                    defaultValue={userData.data?.charge_user || ''}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white'
                    placeholder='Ej: Manager'
                  />
                </label>
                <label className='grid text-cyan-50 col-span-2'>
                  <p className='text-cyan-50'>Firma del Usuario:</p>
                  <textarea
                    name='signatureUser'
                    required
                    defaultValue={userData.data?.signature_user || ''}
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white h-20'
                    placeholder='Ej: Sam Signature'
                  />
                </label>
              </div>
            </fieldset>
            <fieldset className='border border-cyan-300 rounded-lg p-4'>
              <legend className='text-cyan-50 px-2'>Perfil y Proyecto</legend>
              <div className='flex flex-col gap-4'>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Perfil:</p>
                  <select
                    name='idProfile'
                    required
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white'
                    defaultValue={userData.data?.id_profile || ''}
                  >
                    <option value=''>Seleccionar perfil</option>
                    {profilesList && profilesList.map((profile) => (
                      <option key={profile.id_profile} value={profile.id_profile}>
                        {profile.name_profile}
                      </option>
                    ))}
                  </select>
                </label>
                <label className='grid text-cyan-50'>
                  <p className='text-cyan-50'>Proyecto (Opcional):</p>
                  <select
                    name='idProject'
                    className='px-2 py-1 mt-1 rounded-md bg-cyan-700 text-white'
                    defaultValue={userData.data?.id_project || ''}
                  >
                    <option value=''>Sin proyecto asignado</option>
                    {projectsList && projectsList.map((project) => (
                      <option key={project.id_project} value={project.id_project}>
                        {project.name_project}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </fieldset>
          </div>
          <button type='submit' className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white w-full'>
            Actualizar Usuario
          </button>
        </form>
        <section className='mt-4 w-3/4'>
          <p className='text-center text-cyan-50'>
            {newUser ? 'El usuario se ha actualizado con éxito' : 'Aún no se ha actualizado el usuario'}
          </p>
          <div className='text-center mt-4' style={{ display: newUser ? 'block' : 'none' }}>
            <a href='/users/history' className='text-cyan-200 hover:text-white'>Ver todos los usuarios</a>
          </div>
        </section>
      </section>
    </main>
  )
}

export default UpdateUser
