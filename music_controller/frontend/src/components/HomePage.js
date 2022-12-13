import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom'

import CreateRoomPage from './CreateRoomPage'
import JoinRoomPage from './JoinRoomPage'
import RoomPage from './Room'


const HomePage = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<p>Test <strong>inline</strong>.</p>}/>
                <Route path='/join' element={<JoinRoomPage/>}/>
                <Route path='/create' element={<CreateRoomPage/>}/>
                <Route path='/room/:roomCode' element={<RoomPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default HomePage
