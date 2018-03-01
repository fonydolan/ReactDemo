//const greeter = require('./Greeter.js');
//document.querySelector("#root").appendChild(greeter());

import React from 'react'
import { render } from 'react-dom'
import AiGuide from './components/AiGuide'

window._defaultTheme='dark';

render(
    <AiGuide />,
    document.getElementById('root')
)