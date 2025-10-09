import Data from '../../hooks/Data'
import { useState, useMemo, useCallback } from 'react'

const Estadistics = () => {
  const participants = Data('participants')
  const activities = Data('activities')
  const projects = Data('projects')

  // Estados para los filtros
  const [filters, setFilters] = useState({
    name: '',
    gender: '',
    ageMin: '',
    ageMax: '',
    organization: '',
    typeParticipant: '',
    municipality: '',
    project: '',
    activity: ''
  })

  const listData = useMemo(() =>
    participants.data ? participants.data[0].list_participants : [],
  [participants.data]
  )
  const activitiesData = useMemo(() =>
    activities.data && activities.data[0] ? activities.data[0].list_activities : [],
  [activities.data]
  )
  const projectsData = useMemo(() =>
    projects.data && projects.data[0] ? projects.data[0].list_projects : [],
  [projects.data]
  )

  // Función para obtener el nombre de la actividad por ID
  const getActivityName = useCallback((activityId) => {
    const activity = activitiesData.find(act => act.id_activity.toString() === activityId.toString())
    return activity ? activity.activity : 'Actividad no encontrada'
  }, [activitiesData])

  // Función para obtener el nombre del proyecto por ID
  const getProjectName = useCallback((projectId) => {
    const project = projectsData.find(proj => proj.id_project.toString() === projectId.toString())
    return project ? project.name_project : 'Proyecto no encontrado'
  }, [projectsData])

  // Obtener valores únicos para los filtros
  const getUniqueValues = (field) => {
    const values = [...new Set(listData.map(item => {
      if (field === 'project') return getProjectName(item.id_project)
      if (field === 'activity') return getActivityName(item.id_activity)
      return item[field]
    }).filter(value => value && value !== 'N/A' && value !== 'Proyecto no encontrado' && value !== 'Actividad no encontrada'))]
    return values.sort()
  }

  // Datos filtrados usando useMemo para optimización
  const filteredData = useMemo(() => {
    return listData.filter(item => {
      const matchesName = !filters.name || item.name_participant?.toLowerCase().includes(filters.name.toLowerCase())
      const matchesGender = !filters.gender || item.gender === filters.gender
      const matchesAgeMin = !filters.ageMin || (item.age && parseInt(item.age) >= parseInt(filters.ageMin))
      const matchesAgeMax = !filters.ageMax || (item.age && parseInt(item.age) <= parseInt(filters.ageMax))
      const matchesOrganization = !filters.organization || item.organization === filters.organization
      const matchesType = !filters.typeParticipant || item.type_participant === filters.typeParticipant
      const matchesMunicipality = !filters.municipality || item.municipality === filters.municipality
      const matchesProject = !filters.project || getProjectName(item.id_project) === filters.project
      const matchesActivity = !filters.activity || getActivityName(item.id_activity) === filters.activity

      return matchesName && matchesGender && matchesAgeMin && matchesAgeMax &&
             matchesOrganization && matchesType && matchesMunicipality &&
             matchesProject && matchesActivity
    })
  }, [listData, filters, getActivityName, getProjectName])

  // Función para limpiar filtros
  const clearFilters = () => {
    setFilters({
      name: '',
      gender: '',
      ageMin: '',
      ageMax: '',
      organization: '',
      typeParticipant: '',
      municipality: '',
      project: '',
      activity: ''
    })
  }

  // Calcular estadísticas de los datos filtrados
  const statistics = useMemo(() => {
    const total = filteredData.length
    // Estadísticas por género
    const byGender = filteredData.reduce((acc, item) => {
      const gender = item.gender || 'No especificado'
      acc[gender] = (acc[gender] || 0) + 1
      return acc
    }, {})

    // Estadísticas por tipo de participante
    const byType = filteredData.reduce((acc, item) => {
      const type = item.type_participant || 'No especificado'
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {})

    // Estadísticas por municipio
    const byMunicipality = filteredData.reduce((acc, item) => {
      const municipality = item.municipality || 'No especificado'
      acc[municipality] = (acc[municipality] || 0) + 1
      return acc
    }, {})

    // Estadísticas por proyecto
    const byProject = filteredData.reduce((acc, item) => {
      const project = getProjectName(item.id_project)
      acc[project] = (acc[project] || 0) + 1
      return acc
    }, {})

    // Rango de edades
    const ages = filteredData.filter(item => item.age).map(item => parseInt(item.age))
    const ageStats = ages.length > 0
      ? {
          min: Math.min(...ages),
          max: Math.max(...ages),
          avg: Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length)
        }
      : null

    return {
      total,
      byGender,
      byType,
      byMunicipality,
      byProject,
      ageStats
    }
  }, [filteredData, getProjectName])

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <section className='flex flex-col justify-center items-center w-[1200px] h-full bg-gradient-to-t from-cyan-900 to-cyan-700 overflow-y-auto px-6 py-8'>
        <h1 className='text-white text-2xl mb-8'>Estadísticas de Participantes</h1>
        {/* Sección de Filtros */}
        <div className='w-full bg-cyan-800 rounded-lg p-6 mb-6'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-white text-lg'>Filtros de Búsqueda</h2>
            <button
              onClick={clearFilters}
              className='px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition-colors text-sm'
            >
              Limpiar Filtros
            </button>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {/* Filtro por Nombre */}
            <div>
              <label className='text-cyan-100 text-sm mb-1 block'>Nombre</label>
              <input
                type='text'
                value={filters.name}
                onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
                placeholder='Buscar por nombre...'
                className='w-full px-3 py-2 rounded bg-cyan-700 text-white placeholder-cyan-300 border border-cyan-600 focus:border-cyan-400 focus:outline-none'
              />
            </div>

            {/* Filtro por Género */}
            <div>
              <label className='text-cyan-100 text-sm mb-1 block'>Género</label>
              <select
                value={filters.gender}
                onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
                className='w-full px-3 py-2 rounded bg-cyan-700 text-white border border-cyan-600 focus:border-cyan-400 focus:outline-none'
              >
                <option value=''>Todos</option>
                <option value='Male'>Masculino</option>
                <option value='Female'>Femenino</option>
                <option value='Other'>Otro</option>
              </select>
            </div>

            {/* Filtro por Edad Mínima */}
            <div>
              <label className='text-cyan-100 text-sm mb-1 block'>Edad Mínima</label>
              <input
                type='number'
                value={filters.ageMin}
                onChange={(e) => setFilters(prev => ({ ...prev, ageMin: e.target.value }))}
                placeholder='Ej: 18'
                min='0'
                max='100'
                className='w-full px-3 py-2 rounded bg-cyan-700 text-white placeholder-cyan-300 border border-cyan-600 focus:border-cyan-400 focus:outline-none'
              />
            </div>

            {/* Filtro por Edad Máxima */}
            <div>
              <label className='text-cyan-100 text-sm mb-1 block'>Edad Máxima</label>
              <input
                type='number'
                value={filters.ageMax}
                onChange={(e) => setFilters(prev => ({ ...prev, ageMax: e.target.value }))}
                placeholder='Ej: 65'
                min='0'
                max='100'
                className='w-full px-3 py-2 rounded bg-cyan-700 text-white placeholder-cyan-300 border border-cyan-600 focus:border-cyan-400 focus:outline-none'
              />
            </div>

            {/* Filtro por Organización */}
            <div>
              <label className='text-cyan-100 text-sm mb-1 block'>Organización</label>
              <select
                value={filters.organization}
                onChange={(e) => setFilters(prev => ({ ...prev, organization: e.target.value }))}
                className='w-full px-3 py-2 rounded bg-cyan-700 text-white border border-cyan-600 focus:border-cyan-400 focus:outline-none'
              >
                <option value=''>Todas</option>
                {getUniqueValues('organization').map(org => (
                  <option key={org} value={org}>{org}</option>
                ))}
              </select>
            </div>

            {/* Filtro por Tipo de Participante */}
            <div>
              <label className='text-cyan-100 text-sm mb-1 block'>Tipo</label>
              <select
                value={filters.typeParticipant}
                onChange={(e) => setFilters(prev => ({ ...prev, typeParticipant: e.target.value }))}
                className='w-full px-3 py-2 rounded bg-cyan-700 text-white border border-cyan-600 focus:border-cyan-400 focus:outline-none'
              >
                <option value=''>Todos</option>
                {getUniqueValues('type_participant').map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Filtro por Municipio */}
            <div>
              <label className='text-cyan-100 text-sm mb-1 block'>Municipio</label>
              <select
                value={filters.municipality}
                onChange={(e) => setFilters(prev => ({ ...prev, municipality: e.target.value }))}
                className='w-full px-3 py-2 rounded bg-cyan-700 text-white border border-cyan-600 focus:border-cyan-400 focus:outline-none'
              >
                <option value=''>Todos</option>
                {getUniqueValues('municipality').map(mun => (
                  <option key={mun} value={mun}>{mun}</option>
                ))}
              </select>
            </div>

            {/* Filtro por Proyecto */}
            <div>
              <label className='text-cyan-100 text-sm mb-1 block'>Proyecto</label>
              <select
                value={filters.project}
                onChange={(e) => setFilters(prev => ({ ...prev, project: e.target.value }))}
                className='w-full px-3 py-2 rounded bg-cyan-700 text-white border border-cyan-600 focus:border-cyan-400 focus:outline-none'
              >
                <option value=''>Todos</option>
                {getUniqueValues('project').map(proj => (
                  <option key={proj} value={proj}>{proj}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Sección de Estadísticas Principales */}
        <div className='w-full bg-cyan-800 rounded-lg p-6 mb-6'>
          <h2 className='text-white text-lg mb-4'>Estadísticas Generales</h2>
          {/* Panel Principal de Estadísticas */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
            {/* Total de participantes */}
            <div className='bg-cyan-700 rounded-lg p-4 text-center'>
              <h3 className='text-cyan-100 text-sm font-medium mb-2'>Total de Participantes</h3>
              <p className='text-white text-3xl font-bold'>{statistics.total}</p>
              <p className='text-cyan-200 text-xs mt-1'>de {listData.length} totales</p>
            </div>

            {/* Estadísticas por género */}
            <div className='bg-cyan-700 rounded-lg p-4'>
              <h3 className='text-cyan-100 text-sm font-medium mb-3 text-center'>Distribución por Género</h3>
              <div className='space-y-2'>
                {Object.entries(statistics.byGender).map(([gender, count]) => (
                  <div key={gender} className='flex justify-between items-center'>
                    <span className='text-cyan-200 text-sm'>
                      {gender === 'Male' ? 'Masculino' : gender === 'Female' ? 'Femenino' : gender === 'Other' ? 'Otro' : gender}
                    </span>
                    <div className='flex items-center'>
                      <span className='text-white font-medium mr-2'>{count}</span>
                      <span className='text-cyan-300 text-xs'>
                        ({statistics.total > 0 ? Math.round((count / statistics.total) * 100) : 0}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estadísticas de edad */}
            {statistics.ageStats && (
              <div className='bg-cyan-700 rounded-lg p-4'>
                <h3 className='text-cyan-100 text-sm font-medium mb-3 text-center'>Estadísticas de Edad</h3>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-cyan-200 text-sm'>Promedio:</span>
                    <span className='text-white font-medium'>{statistics.ageStats.avg} años</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-cyan-200 text-sm'>Mínima:</span>
                    <span className='text-white font-medium'>{statistics.ageStats.min} años</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-cyan-200 text-sm'>Máxima:</span>
                    <span className='text-white font-medium'>{statistics.ageStats.max} años</span>
                  </div>
                </div>
              </div>
            )}

            {/* Estadísticas por tipo */}
            <div className='bg-cyan-700 rounded-lg p-4'>
              <h3 className='text-cyan-100 text-sm font-medium mb-3 text-center'>Por Tipo de Participante</h3>
              <div className='space-y-2'>
                {Object.entries(statistics.byType).map(([type, count]) => (
                  <div key={type} className='flex justify-between items-center'>
                    <span className='text-cyan-200 text-sm'>{type}:</span>
                    <div className='flex items-center'>
                      <span className='text-white font-medium mr-2'>{count}</span>
                      <span className='text-cyan-300 text-xs'>
                        ({statistics.total > 0 ? Math.round((count / statistics.total) * 100) : 0}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas Detalladas */}
        {(Object.keys(statistics.byMunicipality).length > 0 || Object.keys(statistics.byProject).length > 0) && (
          <div className='w-full bg-cyan-800 rounded-lg p-6'>
            <h2 className='text-white text-lg mb-4'>Estadísticas Detalladas</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Por municipios */}
              {Object.keys(statistics.byMunicipality).length > 0 && (
                <div className='bg-cyan-700 rounded-lg p-4'>
                  <h3 className='text-cyan-100 text-sm font-medium mb-3'>Distribución por Municipio</h3>
                  <div className='space-y-2 max-h-60 overflow-y-auto'>
                    {Object.entries(statistics.byMunicipality)
                      .sort(([, a], [, b]) => b - a)
                      .map(([municipality, count]) => (
                        <div key={municipality} className='flex justify-between items-center py-1'>
                          <span className='text-cyan-200 text-sm'>{municipality}</span>
                          <div className='flex items-center'>
                            <span className='text-white font-medium mr-2'>{count}</span>
                            <span className='text-cyan-300 text-xs'>
                              ({statistics.total > 0 ? Math.round((count / statistics.total) * 100) : 0}%)
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Por proyectos */}
              {Object.keys(statistics.byProject).length > 0 && (
                <div className='bg-cyan-700 rounded-lg p-4'>
                  <h3 className='text-cyan-100 text-sm font-medium mb-3'>Distribución por Proyecto</h3>
                  <div className='space-y-2 max-h-60 overflow-y-auto'>
                    {Object.entries(statistics.byProject)
                      .sort(([, a], [, b]) => b - a)
                      .filter(([project]) => project !== 'Proyecto no encontrado')
                      .map(([project, count]) => (
                        <div key={project} className='flex justify-between items-center py-1'>
                          <span className='text-cyan-200 text-sm truncate mr-2'>{project}</span>
                          <div className='flex items-center'>
                            <span className='text-white font-medium mr-2'>{count}</span>
                            <span className='text-cyan-300 text-xs'>
                              ({statistics.total > 0 ? Math.round((count / statistics.total) * 100) : 0}%)
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default Estadistics
