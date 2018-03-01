import React, { Component } from 'react'
import { render } from 'react-dom'
import { fetch, goPage, httpUtil } from '../axios/index'
import { Button, Form, message } from 'antd'
import 'antd/lib/message/style/css';
import { HashRouter, Route } from "react-router-dom";

export default class PageRoute extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentWillMount() {
    }
    render() {
        return (
            <div>
                <HashRouter>
                    <div className="mt1em">
                        <Route exact path="/" component={Greeter} />
                    </div>
                </HashRouter>
            </div>
        )
    }
}

