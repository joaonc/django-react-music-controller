import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {
    Button,
    Grid,
    Typography
} from '@mui/material'


const RoomPage = () => {
    const [roomCode, setRoomCode] = useState('')
    const [votesToSkip, setVotesToSkip] = useState('')
    const [guestCanPause, setGuestCanPause] = useState('')
    const [isHost, setIsHost] = useState('')

    const navigate = useNavigate()
    const urlParams = useParams()

    const getRoomDetails = () => {
        fetch(`/api/room/${roomCode}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                navigate('/')
            })
            .then(data => {
                setVotesToSkip(data.votes_to_skip)
                setGuestCanPause(data.guest_can_pause)
                setIsHost(data.is_host)
            }).catch(err => {
            console.error('Error GET room', err)
        })
    }

    const handleClickLeaveRoomButton = (event) => {
        fetch(
            '/api/room/leave/',
            {
                method: 'POST',
                headers: {'content-type': 'application/json'},
            }
        ).then(_response => {
            navigate('/')
        })
    }

    useEffect(() => {
        setRoomCode(urlParams.roomCode)  // `roomCode` comes from route definition
    }, [urlParams])

    useEffect(() => {
        roomCode && getRoomDetails()
    }, [roomCode])

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                <Typography variant='h5' component='h5'>
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <Typography variant='h6' component='h6'>
                    Votes to skip: {votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <Typography variant='h6' component='h6'>
                    Guest can pause: {guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <Typography variant='h6' component='h6'>
                    Is host: {isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <Button variant='contained' color='secondary'
                        onClick={handleClickLeaveRoomButton}>
                    Leave Room
                </Button>

            </Grid>
        </Grid>
    )
}

export default RoomPage
