import React, { Component } from 'react'
import { Button, Table, Select, message, Divider } from 'antd'
import { fetch, httpUtil } from '../../axios/index'
import FlowSteps from '../aiflow/flowsteps'
import UserLevelAddForm from './userleveladdform'
import { Utils } from '../common/utils'
import { Consts } from '../common/consts'
import AiUserLevelAction from './userlevelaction'

import 'antd/lib/divider/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/table/style/css';
import '../styles/base.css';

const Option = Select.Option;

const columnsData = [{
    title: '唯一码',
    dataIndex: 'userLevelID',
    key: 'userLevelID',
}, {
    title: '用户级别码',
    dataIndex: 'userLevelCode',
    key: 'userLevelCode',
}, {
    title: '用户级别名称',
    dataIndex: 'userLevelName',
    key: 'userLevelName',
}, {
    title: '标准Q文本最大重复次数',
    dataIndex: 'repeatStdqMaxCount',
    key: 'repeatStdqMaxCount',
}, {
    title: '默认标记',
    dataIndex: 'default',
    key: 'default',
    render: function (text, record, index) {
        return Utils.Value2Txt.boolV(text);
    }
}, {
    title: '更新时间',
    dataIndex: 'datachangeLasttime',
    key: 'datachangeLasttime',
    render: function (text, record, index) {
        return Utils.Value2Txt.dateV(text);
    }
}];

export default class AiUserLevel extends Component {
    constructor(props) {
        super(props)
        var pagination = Consts.Pagination.Default;
        pagination.onChange = this.fetchData.bind(this);
        this.state = {
            tableData: [],
            corpFlowID: props.match.params.corpFlowID || '0',
            addFormVisible: false,
            pagination: pagination,
            columns: [
                ...columnsData,
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <Button type="danger" className={'ml1em'} onClick={this.delete.bind(this, record.userLevelID)} >删除</Button>
                            <Divider type="vertical" />
                            <Button type="primaty" className={'ml1em'} onClick={this.addFormShow.bind(this, record)} >修改</Button>
                        </span>
                    ),
                }]
        }
    }
    componentDidMount() {
        this.fetchData()
    }
    expandedRowRender(record) {
        return <AiUserLevelAction userlevelID={record.userLevelID} />;
    }
    render() {
        var popForm = '';
        if (this.state.addFormVisible) {
            popForm = <UserLevelAddForm editData={this.state.editData}
                hideForm={this.addFormHide.bind(this)} corpFlowID={this.state.corpFlowID}
                successCall={this.fetchData.bind(this)} />;
        }
        var nextUrl = '';
        var preUrl = "/flowset/" + this.state.corpFlowID;
        return (
            <div>
                <FlowSteps currentStep={2} nextUrl={nextUrl} preUrl={preUrl} doneCall={this.doneCall.bind(this)} />
                <div className="mt1em">
                    <Button type="primary" className={'w10em ml1em'} onClick={this.addFormShow.bind(this)} >添加用户级别</Button>
                </div>
                <div className="mt1em">
                    <Table rowKey="userLevelID" pagination={this.state.pagination}
                        columns={this.state.columns} dataSource={this.state.tableData}
                        expandedRowRender={this.expandedRowRender.bind(this)} />
                </div>
                {popForm}
            </div>
        )
    }//
    doneCall() {
        var corpFlowID = this.state.corpFlowID;
        if (!Utils.ValueCheck.greateZero(corpFlowID)) {
            message.warn('请选择业务流！')
            return;
        }
        var param = { id: corpFlowID };
        var postF = fetch.aiUserLevelValidFlow(param)
        postF.then(res => {
            var result = httpUtil.getResult(res);
            if (!!result.success) {
                location.hash = '/flowdone/' + corpFlowID;
            } else {
                message.warning(result.msg || "验证失败");
            }
        }).catch(error => {
            message.error("验证异常");
        });
    }
    addFormShow(record) {
        if (!Utils.ValueCheck.greateZero(this.state.corpFlowID)) {
            message.warn('请选择业务流！')
            return;
        }
        this.setState({ addFormVisible: true,editData:record });
    }
    addFormHide() {
        this.setState({ addFormVisible: false,editData:null });
    }
    clearMain() {
    }
    stepDone() {
        location.hash = '/flowdone'
    }
    delete(userlevelid){
        var param = { id: userlevelid};
        var postF = fetch.aiUserLevelDelete(param);
        postF.then(res => {
            var result = httpUtil.getResult(res);
            if (!!result.success) {
                message.success("删除成功");
                this.fetchData();
            } else {
                message.warning(result.msg || "删除失败");
            }
        }).catch(error => {
            message.error("删除异常");
        });
    }
    /**
     *  获取业务流
     **/
    fetchData() {
        var pagination = this.state.pagination;
        var param = {
            corpFlowID: this.state.corpFlowID,
            page: { currentPage: pagination.current, pageSize: pagination.pageSize }
        };
        var postF = fetch.aiUserLevelData(param);
        var stateData = {
            tableData: [],
            userlevelID: 0,
            addFormVisible: false
        };
        postF.then(res => {
            var result = httpUtil.getResult(res);
            if (!!result.success) {
                if (!!result.data) {
                    var data = result.data;
                    if (!!data.list) {
                        stateData.tableData = data.list;
                    }
                    pagination.current = data.currentPage || 1;
                    pagination.total = data.totalCount || 0;
                }
            } else {
                message.warning(result.msg || "查询无结果");
            }
            stateData.pagination = pagination;
            this.setState(stateData);
        }).catch(error => {
            stateData.pagination = pagination;
            this.setState(stateData);
            message.error("查询失败");
        });
    }


}
