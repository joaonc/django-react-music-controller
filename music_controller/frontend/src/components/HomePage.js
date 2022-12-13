import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {
    Button,
    ButtonGroup,
    Grid,
    Typography
} from '@mui/material'


const HomePage = () => {
    const [roomCode, setRoomCode] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        // Redirect user to room if already joined
        fetch('/api/room/user-in-room')
            .then(response => response.json())
            .then(data => {
                setRoomCode(data.code)
            })
    })

    useEffect(() => {
        if (roomCode) {
            navigate(`/room/${roomCode}`)
        }
    }, [roomCode])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align='center'>
                <Typography variant='h3' component='h3'>
                    House Party
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <ButtonGroup disableElevation variant='contained' color='primary'>
                    <Button color='primary' to='/join' component={Link}>
                        Join a Room
                    </Button>
                    <Button color='secondary' to='/create' component={Link}>
                        Create a Room
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default HomePage
