import { Box, Button, Dialog, List, ListItem, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React, { useEffect, useState } from 'react'

import patientsList from "../data/patients.json";
import doctorsList from "../data/doctors.json";
import AppointmentForm from './AppointmentForm';

const CalendarDayView = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [showForm, setShowForm] = useState(false)
    const [appointments, setAppointments] = useState(() => {
        const stored = localStorage.getItem("appointments");
        return stored ? JSON.parse(stored) : [];
    })
    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments))
    }, [appointments])

    const handleSave = (newAppointment) => {
        setAppointments((prev) => [...prev, newAppointment])
        setShowForm(false);
    }
    const getAppointmentsForDate = (date) => {
        const dateObj = new Date(date)
        const dateStr = dateObj.toISOString().split("T")[0];
        return appointments.filter((appt) => appt.date === dateStr)
    }

    return (
        <Box sx={{ p: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Select date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    slotProps={{ textField: { helperText: "optional" } }} />
            </LocalizationProvider>
            <Typography variant='h6' sx={{ mt: 3 }}>
                Appointment for {selectedDate.toDateString()}
            </Typography>
            <List>
                {getAppointmentsForDate(selectedDate).length === 0 && (
                    <ListItem>No appointments for this day</ListItem>
                )}
                {getAppointmentsForDate(selectedDate).map((appt, index) => {
                    const patient = patientsList.find((p) => p.id === appt.patientId)
                    const doctor = doctorsList.find((d) => d.id === appt.doctorId);

                    return (
                        <ListItem key={index}>
                            {patient?.name} with {doctor?.name} at {appt.time}
                        </ListItem>
                    )
                })}
            </List>
            <Button variant="contained" onClick={() => setShowForm(true)}>
                Add Appointment
            </Button>
            <Dialog open={showForm} onClose={() => setShowForm(false)}>
                {selectedDate && (
                    <AppointmentForm
                        patients={patientsList}
                        doctors={doctorsList}
                        selectedDate={selectedDate.toISOString().split("T")[0]}
                        onSave={handleSave}
                        onClose={() => setShowForm(false)}
                    />
                )}
            </Dialog>
        </Box>
    )
}

export default CalendarDayView
