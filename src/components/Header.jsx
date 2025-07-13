import React from 'react'
import { AppBar, Toolbar, Typography, Box, Select, MenuItem, InputLabel, FormControl, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import doctorsList from "../data/doctors.json";
import patientsList from "../data/patients.json"
const Header = ({ selectedDoctorFilter, selectedPatientFiilter, setSelectedPatientFilter, setSelectedDoctorFilter, mode, toggleMode }) => {
    return (
        <AppBar position="static" sx={{ mb: 2 }}>
            <Toolbar sx={{ p: 2, justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6">Clinic Calendar</Typography>

                <FormControl sx={{ width: 200, mb: 2 }}>
                    <InputLabel sx={{
                        color: 'white',
                        '&.Mui-focused': {
                            color: 'white',
                        }
                    }} id="filter">Select Doctor</InputLabel>
                    <Select
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#90caf9',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: "white"
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'white',
                            },
                            color: 'white'
                        }}
                        labelId='filter'
                        label='Select Doctor'
                        value={selectedDoctorFilter}
                        onChange={(e) => setSelectedDoctorFilter(e.target.value)}
                    >
                        <MenuItem value="">All Doctors</MenuItem>
                        {doctorsList.map((doctor) => (
                            <MenuItem key={doctor.id} value={doctor.id}>{doctor?.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ width: 200, mb: 2 }}>
                    <InputLabel sx={{
                        color: 'white',
                        '&.Mui-focused': {
                            color: 'white',
                        }
                    }} id='filter'>Select Patient</InputLabel>
                    <Select
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#90caf9',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: "white"
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'white',
                            },
                            color: 'white'
                        }}
                        labelId='filter'
                        label='Select Patient'
                        value={selectedPatientFiilter}
                        onChange={(e) => setSelectedPatientFilter(e.target.value)}
                    >
                        <MenuItem value="">All Patient</MenuItem>
                        {patientsList.map((patient) => (
                            <MenuItem key={patient.id} value={patient.id}>{patient?.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box>
                    <IconButton color="inherit" onClick={toggleMode}>
                        {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Box>
            </Toolbar>

        </AppBar>

    )
}

export default Header
