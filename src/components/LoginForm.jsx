import { Alert, Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { checkCredentials } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import TextBox from './TextBox'

const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (checkCredentials(email, password)) {
      navigate('/calendar')
    } else {
      setError("Invalid credentials");
    }
  }
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight:'97vh'
    }}>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          mx: "auto",
          // mt: 5,
          gap: 2,
          border:'1px solid gainsboro',
          padding:5
        }}
      >
        <Typography variant="h5" align="center">
          Clinic Staff Login
        </Typography>
        <TextBox type='email' label='Enter Email' placeholder="staff@clinic.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextBox type='password' label='Enter Password' show={showPassword} setShow={setShowPassword} value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" variant="contained">Login</Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Box>
  )
}

export default LoginForm
