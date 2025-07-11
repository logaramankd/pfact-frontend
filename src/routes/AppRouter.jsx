import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import CalendarPage from '../pages/CalendarPage'

const AppRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/calendar' element={<CalendarPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
