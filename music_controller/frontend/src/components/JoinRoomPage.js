import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {
    Button,
    Grid,
    TextField,
    Typography
} from '@mui/material'


const JoinRoomPage = () => {
    const [roomCode, setRoomCode] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleRoomCodeChange = (event) => {
        setRoomCode(event.target.value)
    }

    const handleClickEnterRoomButton = (event) => {
        if (roomCode) {
            fetch(
                '/api/room/join/',
                {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({
                        code: roomCode
                    })
                }
            ).then(response => {
                if (response.ok) {
                    navigate(`/room/${roomCode}`)
                }
                throw new Error('Invalid room')
            }).catch(err => {
                setError(err.toString())
            })
        }
    }

    return (
        <Grid container spacing={1} alignItems='center'>
            <Grid item xs={12} align='center'>
                <Typography component='h4' variant='h4'>
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <TextField
                    error={error !== ''}
                    label='code'
                    placeholder='Enter a room code'
                    value={roomCode}
                    helperText={error}
                    variant='outlined'
                    onChange={handleRoomCodeChange}
                />
            </Grid>
            <Grid item xs={12} align='center'>
                <Button variant='contained' color='primary' onClick={handleClickEnterRoomButton}>
                    Enter Room
                </Button>
            </Grid>
            <Grid item xs={12} align='center'>
                <Button variant='contained' color='secondary' to='/' component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}

export default JoinRoomPage
