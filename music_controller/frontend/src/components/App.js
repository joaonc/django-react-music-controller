import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Route, Routes} from "react-router-dom";

import CreateRoomPage from "./CreateRoomPage";
import HomePage from './HomePage'
import JoinRoomPage from "./JoinRoomPage";
import RoomPage from "./Room";


const App = () => {
    return (
        <div className='center'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/join' element={<JoinRoomPage/>}/>
                    <Route path='/create' element={<CreateRoomPage/>}/>
                    <Route path='/room/:roomCode' element={<RoomPage/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default App

const appDiv = document.getElementById('app')
render(<App/>, appDiv)
