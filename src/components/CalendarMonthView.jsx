import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AppointmentForm from "./AppointmentForm";
import { Box, Dialog } from "@mui/material";

// Static JSON data
import patientsList from "../data/patients.json";
import doctorsList from "../data/doctors.json";

const CalendarMonthView = () => {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showForm, setShowForm] = useState(false);

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
        setAppointments([...appointments, newAppointment]);
        setShowForm(false);
    };

    const getAppointmentsForDate = (date) => {
        const dateStr = date.toLocaleDateString('en-CA');
        return appointments.filter((appt) => appt.date === dateStr);
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
                                        <li key={index} style={{ fontSize: "10px" }}>
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
                        onClose={() => setShowForm(false)}
                    />
                )}
            </Dialog>

        </Box>
    );
};

export default CalendarMonthView;
