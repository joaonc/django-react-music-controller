import React, {useState} from 'react'
import { useParams } from 'react-router-dom'


const RoomPage = () => {
    const [votesToSkip, setVotesToSkip] = useState(2)
    const [guestCanPause, setGuestCanPause] = useState(true)
    const [isHost, setIsHost] = useState(false)

    // `useParams` comes from ReactRouter, `roomCode` from route definition
    const urlParams = useParams()
    const roomCode = urlParams.roomCode

    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes to skip: {votesToSkip}</p>
            <p>Guest can pause: {guestCanPause}</p>
            <p>Is host: {isHost}</p>
        </div>
    )
}

export default RoomPage
