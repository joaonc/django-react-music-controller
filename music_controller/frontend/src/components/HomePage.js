import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom'

import CreateRoomPage from './CreateRoomPage'
import JoinRoomPage from './JoinRoomPage'


const HomePage = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<p>Test <strong>inline</strong>.</p>}/>
                <Route path='/join' element={<JoinRoomPage/>}/>
                <Route path='/create' element={<CreateRoomPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default HomePage
