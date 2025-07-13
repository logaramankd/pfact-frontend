import { useState } from "react";
import {
    Box,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    TextField,
    Typography,
} from "@mui/material";

const AppointmentForm = ({ patients, doctors, onSave, onClose, selectedDate, appointmentToEdit }) => {


    const [selectedPatient, setSelectedPatient] = useState(appointmentToEdit?.patientId || "");
    const [selectedDoctor, setSelectedDoctor] = useState(appointmentToEdit?.doctorId || "");
    const [selectedTime, setSelectedTime] = useState(appointmentToEdit?.time || "");

    //Handle save
    const handleSaveClick = (e) => {
        e.preventDefault();

        if (!selectedPatient || !selectedDoctor || !selectedTime) {
            alert("Please fill all fields.");
            return;
        }

        const newAppointment = {
            id: appointmentToEdit?.id || Date.now(),
            date: selectedDate, // This will be set by parent
            patientId: parseInt(selectedPatient),
            doctorId: parseInt(selectedDoctor),
            time: selectedTime,
        };

        onSave(newAppointment);
        onClose();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSaveClick}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: 300,
                p: 3,
            }}
        >
            <Typography variant="h6" align="center">
                Add/Edit Appointment
            </Typography>

            <FormControl fullWidth>
                <InputLabel>Patient</InputLabel>
                <Select
                    value={selectedPatient}
                    label="Patient"
                    onChange={(e) => setSelectedPatient(e.target.value)}
                >
                    {patients.map((patient) => (
                        <MenuItem key={patient.id} value={patient.id}>
                            {patient.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Doctor</InputLabel>
                <Select
                    value={selectedDoctor}
                    label="Doctor"
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                >
                    {doctors.map((doctor) => (
                        <MenuItem key={doctor.id} value={doctor.id}>
                            {doctor.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                autoFocus
                label="Time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
            />

            <Button variant="contained" type="submit">
                Save Appointment
            </Button>
        </Box>
    );
};

export default AppointmentForm;
