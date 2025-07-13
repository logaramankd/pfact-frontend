import React, { useState } from 'react'
import CalendarMonthView from '../components/CalendarMonthView'
import { Box, useMediaQuery } from '@mui/material'
import CalendarDayView from '../components/CalendarDayView'
import Header from '../components/Header'

const CalendarPage = ({ mode, toggleMode }) => {
  const isDesktop = useMediaQuery("(min-width:768px)");
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState("")
  const [selectedPatientFiilter, setSelectedPatientFilter] = useState("")
  return (
    <Box sx={{
      bgcolor: "#fff59d" ,display: 'flex',
      flexDirection:'column',
      alignItems: 'center',
      minHeight: '100dvh'
    }}>
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
    </Box>
  )
}

export default CalendarPage
