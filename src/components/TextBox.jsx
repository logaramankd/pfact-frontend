import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'

const TextBox = ({ label, placeholder, value, type = 'text', onChange, show, setShow }) => {
    function getInput() {
        if (type == "password") {
            return show ? 'text' : 'password'
        }
        return type
    }
    return (
        <div>
            <TextField
                fullWidth
                label={label}
                variant='outlined'
                type={getInput()}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                InputProps={{
                    sx: {
                        '& .MuiInputBase-input': {
                            height: '50px',
                            padding: '8px',
                            boxSizing: 'border-box',
                        }
                    },
                    endAdornment: type === 'password' && (
                        <InputAdornment position='end'>
                            <IconButton onClick={() => setShow(!show)} edge='end' sx={{ color: 'black' }}>
                                {show ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                InputLabelProps={{
                    sx: {
                        fontSize: '0.9rem',
                    },
                }}
            />
        </div>
    )
}

export default TextBox
