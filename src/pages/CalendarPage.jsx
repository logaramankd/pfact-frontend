import React from 'react'
import CalendarMonthView from '../components/CalendarMonthView'
import { useMediaQuery } from '@mui/material'
import CalendarDayView from '../components/CalendarDayView'

const CalendarPage = () => {
  const isDesktop = useMediaQuery("(min-width:768px)");

  return isDesktop ? <CalendarMonthView /> : <CalendarDayView />
}

export default CalendarPage
