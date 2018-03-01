import React, { Component } from 'react'
import { render } from 'react-dom'
import { Layout, Menu, Icon, message } from 'antd'
import 'antd/lib/layout/style/css';
import 'antd/lib/menu/style/css';
import '../styles/page.css'
import { config } from './config'
import FlowSteps from '../aiflow/flowsteps'

const { Header, Footer, Content } = Layout;
const SubMenu = Menu.SubMenu;

export default class PageMain extends Component {
    constructor(props) {
        super(props);//{content:}
        this.state = {
            collapsed: false,
        }
    }

    onCollapse(collapsed) {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    render() {
        return (
            <Layout theme={config.defaultTheme} style={{ minHeight: '100vh' }}>
                <Content style={{ margin: '0 16px' }}>
                    <FlowSteps />
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        {this.props.content}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    demo ©2018 Created by test
            </Footer>
            </Layout>
        )
    }
}