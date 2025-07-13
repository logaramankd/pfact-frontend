import { Box, Button, Dialog, FormControl, InputLabel, List, ListItem, MenuItem, Select, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React, { useEffect, useState } from 'react'

import patientsList from "../data/patients.json";
import doctorsList from "../data/doctors.json";
import AppointmentForm from './AppointmentForm';

const CalendarDayView = ({ selectedDoctorFilter, selectedPatientFiilter }) => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [showForm, setShowForm] = useState(false)

    const [appointmentToEdit, setAppointmentToEdit] = useState(null);

    const [appointments, setAppointments] = useState(() => {
        const stored = localStorage.getItem("appointments");
        return stored ? JSON.parse(stored) : [];
    })
    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments))
    }, [appointments])

    const handleSave = (newAppointment) => {
        if (appointments.some((appt) => appt.id === newAppointment.id)) {
            // Update
            setAppointments((prev) =>
                prev.map((appt) =>
                    appt.id === newAppointment.id ? newAppointment : appt
                )
            );
        } else {
            // Add new
            setAppointments((prev) => [...prev, newAppointment]);
        }
        setShowForm(false);
        setAppointmentToEdit(null);
    };

    const handleEdit = (appt) => {
        setSelectedDate(new Date(appt.date));
        setAppointmentToEdit(appt);
        setShowForm(true);
    };
    const getAppointmentsForDate = (date) => {
        const dateObj = new Date(date)
        const dateStr = dateObj.toLocaleDateString('en-CA');
        return appointments.filter((appt) => {
            const mathcesDate = appt.date === dateStr
            const matchesDoctor = selectedDoctorFilter === "" || appt.doctorId === parseInt(selectedDoctorFilter)
            const matchesPatient = selectedPatientFiilter === "" || appt.patientId === parseInt(selectedPatientFiilter)
            return mathcesDate && matchesDoctor && matchesPatient
        })
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
                        <li key={index} onClick={() => handleEdit(appt)} style={{ cursor: "pointer", fontSize: "10px" }}>
                            {patient ? patient.name : "Unknown"} @ {appt.time}
                            <hr />
                        </li>
                        
                    );
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
                        selectedDate={selectedDate.toLocaleDateString('en-CA')}
                        onSave={handleSave}
                        onClose={() => { setShowForm(false); setAppointmentToEdit(null); }}
                        appointmentToEdit={appointmentToEdit}
                    />
                )}
            </Dialog>
        </Box>
    )
}

export default CalendarDayView
