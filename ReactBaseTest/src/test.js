
import React from 'react'
import { render } from 'react-dom'
import './styles/main.css'
import Greeter from './components/Greeter'


render(
    <div>
        <Greeter />
    </div>,
    document.getElementById('root')
)