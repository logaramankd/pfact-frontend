import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AppointmentForm from "./AppointmentForm";
import { Box, Dialog, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// Static JSON data
import patientsList from "../data/patients.json";
import doctorsList from "../data/doctors.json";
import { AppBlockingSharp } from "@mui/icons-material";

const CalendarMonthView = ({ selectedDoctorFilter, selectedPatientFiilter }) => {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [appointmentToEdit, setAppointmentToEdit] = useState(null);


    // Load appointments from localStorage on mount
    const [appointments, setAppointments] = useState(() => {
        const stored = localStorage.getItem("appointments");
        return stored ? JSON.parse(stored) : [];
    })

    // Save appointments to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("appointments", JSON.stringify(appointments));
    }, [appointments]);

    const handleDateClick = (value) => {
        setSelectedDate(value);
        setShowForm(true);
    };

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
        const dateStr = date.toLocaleDateString('en-CA');
        return appointments.filter((appt) => {
            const mathcesDate = appt.date === dateStr
            const matchesDoctor = selectedDoctorFilter === "" || appt.doctorId === parseInt(selectedDoctorFilter)
            const matchesPatient = selectedPatientFiilter === "" || appt.patientId === parseInt(selectedPatientFiilter)
            return mathcesDate && matchesDoctor && matchesPatient
        });
    };

    return (
        <Box sx={{ p: 3, width: '400px', mx: 'auto' }}>

            <Calendar
                onClickDay={handleDateClick}
                value={date}
                onChange={setDate}
                tileContent={({ date, view }) => {
                    if (view === "month") {
                        const dayAppointments = getAppointmentsForDate(date);
                        return (
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                {dayAppointments.map((appt, index) => {
                                    const patient = patientsList.find((p) => p.id === appt.patientId);
                                    return (
                                        <li key={index} onClick={() => handleEdit(appt)} style={{ cursor: "pointer", fontSize: "10px" }}>
                                            {patient ? patient.name : "Unknown"} @ {appt.time}
                                        </li>
                                    );
                                })}
                            </ul>
                        );
                    }
                    return null;
                }}
            />

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
    );
};

export default CalendarMonthView;
