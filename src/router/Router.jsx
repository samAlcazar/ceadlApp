import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login/Login'
import App from '../pages/app'
import Home from '../pages/home/Home'

// Actividades
import CreateActivity from '../pages/activity/CreateActivity'
import UpdateActivity from '../pages/activity/UpdateActivity'

// Proyectos
import Project from '../pages/projects/Project'
import CreateProject from '../pages/projects/create/CreateProject'
import UpdateProject from '../pages/projects/update/UpdateProject'
import CreateEspecifics from '../pages/projects/create/CreateEspecifics'
import UpdateEspecifics from '../pages/projects/update/UpdateEspecifics'
import CreateProjectResults from '../pages/projects/create/CreateProjectResults'
import UpdateProjectResults from '../pages/projects/update/UpdateProjectResults'
import CreateProjectActivities from '../pages/projects/create/CreateProjectActivities'
import UpdateProjectActivities from '../pages/projects/update/UpdateProjectActivities'
import HistoryProjects from '../pages/projects/HistoryProjects'

// Reportes
import CreateReport from '../pages/reports/create/CreateReport'
import UpdateReport from '../pages/reports/update/UpdateReport'
import CreateQuantitative from '../pages/reports/create/CreateQuantitative'
import UpdateQuantitative from '../pages/reports/update/UpdateQuantitative'
import HistoryReports from '../pages/reports/HistoryReports'
import Report from '../pages/reports/Report'

// Rendiciones
import CreateAccountability from '../pages/accountability/create/CreateAccountability'
import UpdateAccountability from '../pages/accountability/update/UpdateAccountability'
import CreateSurrender from '../pages/accountability/create/CreateSurrender'
import UpdateSurrender from '../pages/accountability/update/UpdateSurrender'
import HistoryAccountability from '../pages/accountability/HistoryAccountability'
import Accountability from '../pages/accountability/Accountability'

// Postulaciones
import CreateApplication from '../pages/applications/create/CreateApplication'
import UpdateApplication from '../pages/applications/update/UpdateApplication'
import CreateBudget from '../pages/applications/create/CreateBudget'
import UpdateBudget from '../pages/applications/update/UpdateBudget'
import HistoryApplications from '../pages/applications/HistoryApplications'
import Application from '../pages/applications/Application'
import HistoryActivities from '../pages/activity/HistoryActivities'
import Activity from '../pages/activity/Activity'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />

        {/* Rutas de Actividades */}
        <Route path='activities'>
          <Route path='create' element={<CreateActivity />} />
          <Route path='update/:idActivity' element={<UpdateActivity />} />
          <Route path='history' element={<HistoryActivities />} />
          <Route path=':idActivity' element={<Activity />} />
        </Route>

        {/* Rutas de Proyectos */}
        <Route path='projects'>
          <Route path='create' element={<CreateProject />} />
          <Route path='update/:idProject' element={<UpdateProject />} />
          <Route path='history' element={<HistoryProjects />} />
          <Route path=':idProject' element={<Project />} />
        </Route>
        <Route path='especifics'>
          <Route path='create/:idProject' element={<CreateEspecifics />} />
          <Route path='update/:idProject' element={<UpdateEspecifics />} />
        </Route>
        <Route path='projectResults'>
          <Route path='create/:idProject' element={<CreateProjectResults />} />
          <Route path='update/:idProject' element={<UpdateProjectResults />} />
        </Route>
        <Route path='projectActivities'>
          <Route path='create/:idProject' element={<CreateProjectActivities />} />
          <Route path='update/:idProject' element={<UpdateProjectActivities />} />
        </Route>

        {/* Rutas de Reportes */}
        <Route path='reports'>
          <Route path='create' element={<CreateReport />} />
          <Route path='update/:idReport' element={<UpdateReport />} />
          <Route path='history' element={<HistoryReports />} />
          <Route path=':idReport' element={<Report />} />
        </Route>
        <Route path='quantitative'>
          <Route path='create/:idActivity' element={<CreateQuantitative />} />
          <Route path='update/:idActivity' element={<UpdateQuantitative />} />
        </Route>

        {/* Rutas de Rendiciones */}
        <Route path='accountability'>
          <Route path='create' element={<CreateAccountability />} />
          <Route path='update/:idAccountability' element={<UpdateAccountability />} />
          <Route path='history' element={<HistoryAccountability />} />
          <Route path=':idAccountability' element={<Accountability />} />
        </Route>
        <Route path='surrenders'>
          <Route path='create/:idAccountability' element={<CreateSurrender />} />
          <Route path='update/:idAccountability' element={<UpdateSurrender />} />
        </Route>

        {/* Rutas de Solicitudes */}
        <Route path='applications'>
          <Route path='create' element={<CreateApplication />} />
          <Route path='update/:idApplication' element={<UpdateApplication />} />
          <Route path='history' element={<HistoryApplications />} />
          <Route path=':idApplication' element={<Application />} />
        </Route>
        <Route path='budgets'>
          <Route path='create/:idApplication' element={<CreateBudget />} />
          <Route path='update/:idApplication' element={<UpdateBudget />} />
        </Route>
      </Route>

      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default Router
