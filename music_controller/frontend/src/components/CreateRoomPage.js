import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
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
    const [votesToSkip, setVotesToSkip] = useState(2)
    const [guestCanPause, setGuestCanPause] = useState(true)

    const navigate = useNavigate()

    const handleVotesChange = (event) => {
        setVotesToSkip(event.target.value)
    }

    const handleCanPauseChange = (event) => {
        setGuestCanPause(event.target.value)
    }

    const handleClickCreateRoomButton = (event) => {
        console.log(votesToSkip, guestCanPause)
        fetch(
            '/api/room/',
            {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    guest_can_pause: guestCanPause,
                    votes_to_skip: votesToSkip
                })
            }
        ).then(response => response.json()
        ).then(data => {
            navigate(`/room/${data.code}`)
        }).catch(err => {
            console.log('Error POST room', err)
        })
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                <Typography component='h4' variant='h4'>
                    Create a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <FormControl component='fieldset'>
                    <FormHelperText>
                        <div align='center'>
                            Guest Control of Playback State
                        </div>
                    </FormHelperText>
                    <RadioGroup
                        row
                        defaultValue={guestCanPause}
                        onChange={handleCanPauseChange}
                    >
                        <FormControlLabel
                            value={true}
                            control={<Radio color='primary'/>}
                            label='Play/Pause'
                            labelPlacement='bottom'
                        />
                        <FormControlLabel
                            value={false}
                            control={<Radio color='secondary'/>}
                            label='No Control'
                            labelPlacement='bottom'
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align='center'>
                <FormControl>
                    <TextField
                        required={true}
                        type='number'
                        defaultValue={votesToSkip}
                        onChange={handleVotesChange}
                        inputProps={{
                            min: 1,
                            style: {
                                textAlign: 'center',
                            },
                        }}
                    />
                    <FormHelperText>
                        <div align='center'>
                            Votes Required to Skip Song
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align='center'>
                <Button color='primary' variant='contained' onClick={handleClickCreateRoomButton}>
                    Create a Room
                </Button>
            </Grid>
            <Grid item xs={12} align='center'>
                <Button color='secondary' variant='contained' to='/' component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}

export default CreateRoomPage
