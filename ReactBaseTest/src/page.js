//const greeter = require('./Greeter.js');
//document.querySelector("#root").appendChild(greeter());

import React from 'react'
import { render } from 'react-dom'
import AiGuide from './components/AiGuide'
import Page from './components/common/page'

const content = <AiGuide />;
render(
    <Page content={content}>
    </Page>,
    document.getElementById('root')
)