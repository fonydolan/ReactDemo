//const greeter = require('./Greeter.js');
//document.querySelector("#root").appendChild(greeter());

import React from 'react'
import { render } from 'react-dom'
import 'antd/lib/select/style/css'; 
import { Select } from 'antd'
const Option = Select.Option;

render(
    <div>
        <Select defaultValue="lucy" style={{ width: 120 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>Disabled</Option>
            <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <label>test</label>
        <Select defaultValue="lucy" style={{ width: 120 }} allowClear disabled>
            <Option value="lucy">Lucy</Option>
        </Select>
    </div>,
    document.getElementById('root')
)