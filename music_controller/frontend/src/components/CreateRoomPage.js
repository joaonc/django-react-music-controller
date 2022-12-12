import React from 'react'
import {Link} from 'react-router-dom'
import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@mui/material'


const CreateRoomPage = () => {
    const defaultVotes = 2

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                <Typography component='h4' variant='h4'>
                    Create a Room
                </Typography>
            </Grid>
        </Grid>
    )}

export default CreateRoomPage
