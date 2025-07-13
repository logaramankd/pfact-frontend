import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import CalendarPage from '../pages/CalendarPage'

const AppRouter = ({ mode, toggleMode }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/calendar' element={<CalendarPage mode={mode} toggleMode={toggleMode}/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
