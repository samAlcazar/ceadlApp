import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/login/Login'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route index element={<div>Welcome to the Home Page</div>} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default Router
