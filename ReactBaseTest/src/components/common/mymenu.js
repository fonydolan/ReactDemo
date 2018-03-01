import React, { Component } from 'react'
import { render } from 'react-dom'
import { Menu, Icon, message } from 'antd'
import 'antd/lib/menu/style/css';
import { fetch, httpUtil } from '../../axios/index'
const SubMenu = Menu.SubMenu;

export default class MyMenu extends Component {
    constructor(props) {
        super(props);//{content:}
        this.state = {
            menusData: []
        }
    }
    componentWillMount() {
        this.getMenus();
    }
    getMenus() {
        var menus = [];
        fetch.menusData().then(res => {
            var result = httpUtil.getResult(res);
            if (!!result.success) {
                if (!!result.data && result.data.length > 0) {
                    menus = result.data;
                }
            } else {
                message.warning(result.msg);
            }
            this.setState({ menusData: menus });
        }).catch(error => {
            this.setState({ menusData: menus });
            console.error(error);
            message.error("查询失败");
        });
    }

    render() {
        var menus = [];
        this.state.menusData.forEach(item => {
            var menuItem;
            if (!!item.children && item.children.length > 0) {
                var subs = [];
                item.children.forEach(itemChild => {
                    subs.push(
                        < Menu.Item key={itemChild.menuID} >
                            <div>
                                <i className={'menuicon icon'}>{itemChild.icon}</i>
                                <span className={'menuspan'} data-url={itemChild.url}>{itemChild.name}</span>
                            </div>
                        </Menu.Item >);
                });
                menuItem = <SubMenu
                    children={subs}
                    key={item.menuID}
                    title={
                        <div>
                            <i className={'menuicon icon'}>{item.icon}</i>
                            <span className={'menuspan'} data-url={item.url}>{item.name}</span>
                        </div>
                    }
                >
                </SubMenu>
            } else {
                menuItem = <Menu.Item key={item.menuID}>
                    <div>
                        <i className={'menuicon icon'}>{item.icon}</i>
                        <span className={'menuspan'} data-url={item.url}>{item.name}</span>
                    </div>
                </Menu.Item>
            }
            menus.push(menuItem);
        });
        return <Menu defaultSelectedKeys={['1']} mode="inline">
            {menus}
        </Menu>
    }
}