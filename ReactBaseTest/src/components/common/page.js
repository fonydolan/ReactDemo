import React, { Component } from 'react'
import { render } from 'react-dom'
import { Layout, Menu, Breadcrumb, Icon, message } from 'antd'
import 'antd/lib/layout/style/css';
import 'antd/lib/menu/style/css';
import 'antd/lib/breadcrumb/style/css';
import '../styles/page.css'
import MyMenu from './mymenu'
import { config } from './config'

const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

export default class Page extends Component {
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
        return <Layout theme={config.defaultTheme} style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse.bind(this)}
            >
                <div className="logo" />
                <MyMenu />
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0, lineHeight: '60px' }} >
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        {this.props.content}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    demo ©2018 Created by test
                </Footer>
            </Layout>
        </Layout>
    }
}
