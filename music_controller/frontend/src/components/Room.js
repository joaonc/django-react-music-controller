import React, {useState} from 'react'

const RoomPage = () => {
    const [votesToSkip, setVotesToSkip] = useState(2)
    const [guestCanPause, setGuestCanPause] = useState(true)
    const [isHost, setIsHost] = useState(false)

    return (
        <div>
            <p>Votes to skip: {votesToSkip}</p>
            <p>Guest can pause: {guestCanPause}</p>
            <p>Is host: {isHost}</p>
        </div>
    )

}

export default RoomPage
