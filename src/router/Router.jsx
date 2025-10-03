import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login/Login'
import App from '../pages/app'
import Home from '../pages/home/Home'

// Actividades
import CreateActivity from '../pages/activity/CreateActivity'
import UpdateActivity from '../pages/activity/UpdateActivity'

// Proyectos
import CreateProject from '../pages/projects/CreateProject'
import UpdateProject from '../pages/projects/UpdateProject'
import CreateEspecifics from '../pages/projects/CreateEspecifics'

// Reportes
import CreateReport from '../pages/reports/CreateReport'
import UpdateReport from '../pages/reports/UpdateReport'
import CreateProjectResults from '../pages/projects/CreateProjectResults'
import CreateProjectActivities from '../pages/projects/CreateProjectActivities'

// Rendiciones
import CreateAccountability from '../pages/accountability/CreateAccountability'
import UpdateAccountability from '../pages/accountability/UpdateAccountability'

// Postulaciones
import CreateApplication from '../pages/applications/CreateApplication'
import UpdateApplication from '../pages/applications/UpdateApplication'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        
        {/* Rutas de Actividades */}
        <Route path='activities'>
          <Route path='create' element={<CreateActivity />} />
          <Route path='update/:idActivity' element={<UpdateActivity />} />
        </Route>

        {/* Rutas de Proyectos */}
        <Route path='projects'>
          <Route path='create' element={<CreateProject />} />
          <Route path='update/:idProject' element={<UpdateProject />} />
        </Route>
        <Route path='especifics'>
          <Route path='create/:idProject' element={<CreateEspecifics />} />
        </Route>
        <Route path='projectResults'>
          <Route path='create/:idProject' element={<CreateProjectResults />} />
        </Route>
        <Route path='projectActivities'>
          <Route path='create/:idProject' element={<CreateProjectActivities />} />
        </Route>

        {/* Rutas de Reportes */}
        <Route path='reports'>
          <Route path='create' element={<CreateReport />} />
          <Route path='update/:idReport' element={<UpdateReport />} />
        </Route>

        {/* Rutas de Rendiciones */}
        <Route path='accountability'>
          <Route path='create' element={<CreateAccountability />} />
          <Route path='update/:idAccountability' element={<UpdateAccountability />} />
        </Route>

        {/* Rutas de Postulaciones */}
        <Route path='applications'>
          <Route path='create' element={<CreateApplication />} />
          <Route path='update/:idApplication' element={<UpdateApplication />} />
        </Route>
      </Route>

      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default Router
