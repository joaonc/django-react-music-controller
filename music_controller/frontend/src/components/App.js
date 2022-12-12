import React from 'react'
import {render} from 'react-dom'

import HomePage from './HomePage'
import CreateRoomPage from './CreateRoomPage'
import JoinRoomPage from './JoinRoomPage'


const App = () => {
    return (
        <div>
            <HomePage/>
            <JoinRoomPage/>
            <CreateRoomPage/>
        </div>
    )
}

export default App

const appDiv = document.getElementById('app')
render(<App/>, appDiv)
