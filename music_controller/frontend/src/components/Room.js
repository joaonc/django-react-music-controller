import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'


const RoomPage = () => {
    const [roomCode, setRoomCode] = useState('')
    const [votesToSkip, setVotesToSkip] = useState('')
    const [guestCanPause, setGuestCanPause] = useState('')
    const [isHost, setIsHost] = useState('')

    const urlParams = useParams()

    const getRoomDetails = () => {
        fetch(`/api/room/${roomCode}`)
            .then(response => response.json())
            .then(data => {
                setVotesToSkip(data.votes_to_skip)
                setGuestCanPause(data.guest_can_pause)
                setIsHost(data.is_host)
            }).catch(err => {
            console.error('Error GET room', err)
        })
    }

    useEffect(() => {
        setRoomCode(urlParams.roomCode)  // `roomCode` comes from route definition
    }, [urlParams])

    useEffect(() => {
        roomCode && getRoomDetails()
    }, [roomCode])

    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes to skip: {votesToSkip}</p>
            <p>Guest can pause: {guestCanPause.toString()}</p>
            <p>Is host: {isHost.toString()}</p>
        </div>
    )
}

export default RoomPage
