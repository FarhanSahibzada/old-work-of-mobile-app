import React from 'react'
import Dashboard from "./AdminDashboard/Dashboard";
import UserList from "./AdminDashboard/UserList";
import ActiveDriver from "./AdminDashboard/ActiveDriver";
import DriverList from "./AdminDashboard/DriverList";
import { Route, Routes } from 'react-router-dom'
import Adminscreens from './AdminDashboard/AdminScreens';
import App from './App.jsx';

const Router = () => {
  return (
        <>
      <Routes>
        <Route index element={<App/>} />
        <Route element={<Adminscreens/>}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/driver" element={<ActiveDriver />} />
        <Route path="/driverlist" element={<DriverList />} />
        </Route>
      </Routes>
      </>
  )
}

export default Router