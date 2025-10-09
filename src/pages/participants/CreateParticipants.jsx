import { useState, useEffect } from 'react'
import Authorized from '../../hooks/Authorized'
import Data from '../../hooks/Data'
import { useParams } from 'react-router-dom'
import { URL } from '../../../utils/url'

const CreateParticipants = () => {
  const user = Authorized()
  const { idActivity } = useParams()
  const [allParticipants, setAllParticipants] = useState([])
  const [participants, setParticipants] = useState([])

  const projects = Data('projects')
  const founders = Data('founders')
  const activities = Data('activities')
  const [selectedProject, setSelectedProject] = useState('')
  const [filteredActivities, setFilteredActivities] = useState([])

  // useEffect para filtrar actividades por proyecto
  useEffect(() => {
    if (selectedProject && activities.data && activities.data[0] && activities.data[0].list_activities) {
      const filtered = activities.data[0].list_activities.filter(
        activity => activity.id_project.toString() === selectedProject
      )
      setFilteredActivities(filtered)
    } else {
      setFilteredActivities([])
    }
  }, [selectedProject, activities.data])

  // useEffect para ver cuando cambia el estado
  useEffect(() => {
    console.log('Participantes actualizados:', participants)
  }, [participants])

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value)
  }

  const pushParticipant = (e) => {
    e.preventDefault()

    // Acceder al formulario desde el botón
    const form = e.target.closest('form')
    const body = {
      nameParticipant: form.nameParticipant.value,
      gender: form.gender.value,
      age: parseInt(form.age.value),
      organization: form.organization.value,
      phone: form.phone.value,
      typeParticipant: form.typeParticipant.value,
      municipality: form.municipality.value,
      typeOrganization: form.typeOrganization.value,
      idProject: form.idProject.value,
      idFounder: form.idFounder.value,
      idActivity: form.idActivity.value || idActivity,
      idUser: user.idUser
    }
    setParticipants([...participants, body])
    form.reset()
    setSelectedProject('')
    setFilteredActivities([])
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`${URL}participants/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(participants)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Participantes subidos con éxito:', data)
        setAllParticipants(data)
      })
      .catch((error) => {
        console.error('Error al subir los participantes:', error)
      })
  }

  const deleteParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index))
  }

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[900px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto px-6 py-8'>
        <h1 className='text-white text-2xl mb-8'>Crear participantes</h1>
        <form className='grid grid-cols-2 gap-4 w-4/5 mb-6'>
          <div>
            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50'>Nombre del participante:</p>
              <input type='text' name='nameParticipant' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white' />
            </label>
            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50'>Género:</p>
              <select name='gender' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white'>
                <option value=''>Seleccionar género</option>
                <option value='Male'>Masculino</option>
                <option value='Female'>Femenino</option>
                <option value='Other'>Otro</option>
              </select>
            </label>
            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50'>Edad:</p>
              <input type='number' name='age' min='1' max='120' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white' />
            </label>
            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50'>Organización:</p>
              <input type='text' name='organization' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white' />
            </label>
            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50'>Teléfono:</p>
              <input type='tel' name='phone' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white' />
            </label>
          </div>
          <div>
            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50'>Tipo de participante:</p>
              <select name='typeParticipant' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white'>
                <option value=''>Seleccionar tipo</option>
                <option value='Volunteer'>Voluntario</option>
                <option value='Beneficiary'>Beneficiario</option>
                <option value='Staff'>Personal</option>
                <option value='Partner'>Socio</option>
              </select>
            </label>
            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50'>Municipio:</p>
              <input type='text' name='municipality' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white' />
            </label>
            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50'>Tipo de organización:</p>
              <select name='typeOrganization' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white'>
                <option value=''>Seleccionar tipo</option>
                <option value='Non-profit'>Sin fines de lucro</option>
                <option value='Government'>Gubernamental</option>
                <option value='Private'>Privada</option>
                <option value='Educational'>Educativa</option>
              </select>
            </label>
            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50'>Proyecto:</p>
              <select
                name='idProject'
                required
                className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white'
                onChange={handleProjectChange}
                value={selectedProject}
              >
                <option value=''>Seleccionar proyecto</option>
                {projects.data && projects.data[0] && projects.data[0].list_projects
                  ? projects.data[0].list_projects.map((project) => (
                    <option key={project.id_project} value={project.id_project}>
                      {project.name_project}
                    </option>
                  ))
                  : null}
              </select>
            </label>
            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50'>Financiador:</p>
              <select name='idFounder' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white'>
                <option value=''>Seleccionar financiador</option>
                {founders.data && founders.data.map((founder) => (
                  <option key={founder.id_founder} value={founder.id_founder}>
                    {founder.name_founder}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className='col-span-2'>
            <label className='grid text-cyan-50 mb-4'>
              <p className='text-cyan-50'>Actividad:</p>
              <select name='idActivity' required className='px-2 py-1 mt-2 rounded-md bg-cyan-700 text-white'>
                <option value=''>Seleccionar actividad</option>
                {filteredActivities.map((activity) => (
                  <option key={activity.id_activity} value={activity.id_activity}>
                    {activity.activity}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={pushParticipant} className='mt-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white w-full'>Agregar Participante</button>
          </div>
        </form>

        <section className='mt-4 w-4/5'>
          <h2 className='text-white text-lg mb-4'>Participantes agregados</h2>
          <div className='grid grid-cols-3 gap-4 mb-4'>
            {
              participants.map((participant, index) => (
                <div key={index} className='bg-cyan-800 p-3 rounded-md'>
                  <p className='text-cyan-50 font-semibold'>{participant.nameParticipant}</p>
                  <p className='text-cyan-50 text-sm'>{participant.gender}, {participant.age} años</p>
                  <p className='text-cyan-50 text-sm'>{participant.organization}</p>
                  <p className='text-cyan-50 text-sm'>{participant.typeParticipant}</p>
                  <p className='text-cyan-50 text-sm'>{participant.municipality}</p>
                  <button onClick={() => deleteParticipant(index)} className='mt-2 px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm'>Eliminar</button>
                </div>
              ))
            }
          </div>
        </section>

        {participants.length > 0 && (
          <button onClick={handleSubmit} className='mt-4 px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white'>Subir participantes</button>
        )}

        <section className='mt-4 w-3/4 text-center'>
          <p className='text-cyan-50'>{allParticipants.length > 0 ? 'Los participantes se han creado con éxito' : 'Aún no se han subido los participantes'}</p>
          {allParticipants.length > 0 && (
            <a href='/participants/list' className='mt-4 text-cyan-200 hover:text-white block'>Ver historial de participantes</a>
          )}
        </section>
      </section>
    </main>
  )
}

export default CreateParticipants
