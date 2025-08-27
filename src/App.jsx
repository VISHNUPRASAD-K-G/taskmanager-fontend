import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admindashboard from './admin/pages/Admindashboard'
import Adminusers from './admin/pages/Adminusers'
import Admintasks from './admin/pages/Admintasks'
import Userdashboard from './users/pages/Userdashboard.jsx'
import Usertasks from './users/pages/Usertasks'
import Auth from './pages/Auth'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/user-dashboard' element={<Userdashboard />} />
        <Route path='/user-tasks' element={<Usertasks />} />


        <Route path='/admin-dashboard' element={<Admindashboard/>} />
        <Route path='/admin-users' element={<Adminusers/>} />
        <Route path='/admin-tasks' element={<Admintasks/>} />
      </Routes>
    </>
  )
}

export default App
