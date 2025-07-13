import React, { useState } from 'react'
import CalendarMonthView from '../components/CalendarMonthView'
import { useMediaQuery } from '@mui/material'
import CalendarDayView from '../components/CalendarDayView'
import Header from '../components/Header'

const CalendarPage = ({ mode, toggleMode }) => {
  const isDesktop = useMediaQuery("(min-width:768px)");
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState("")
  const [selectedPatientFiilter, setSelectedPatientFilter] = useState("")
  return (
    <>
      <Header
        selectedDoctorFilter={selectedDoctorFilter}
        setSelectedDoctorFilter={setSelectedDoctorFilter}
        selectedPatientFiilter={selectedPatientFiilter}
        setSelectedPatientFilter={setSelectedPatientFilter}
        mode={mode}
        toggleMode={toggleMode}
      />
      {isDesktop ? (
        <CalendarMonthView selectedDoctorFilter={selectedDoctorFilter} selectedPatientFiilter={selectedPatientFiilter} />
      ) : (
        <CalendarDayView selectedDoctorFilter={selectedDoctorFilter} selectedPatientFiilter={selectedPatientFiilter} />
      )}
    </>
  )
}

export default CalendarPage
