import React, { Component } from 'react'
import { fetch, httpUtil } from '../../axios/index'
import PopForm,{ PopUtils } from '../common/popform'
import { message } from 'antd'
import { Consts } from '../common/consts'
import { Utils } from '../common/utils';

const columnsData = [
    {
        type: 'input', placeholder: '',
        key: 'code', name: 'code码', initialValue: '', help: '', required: true, message: '请输入'
    },
    {
        type: 'input', placeholder: '', 
        editAble: true, editKey: '',rowDataKey:'',
        key: 'name', name: '名称', initialValue: '', help: '', required: true, message: '请输入'
    }
];

export default class DemoForm extends Component {
    constructor(props) {
        super(props);//{corpFlowID:}
        this.state = {
            columns: columnsData
        }
    }
    componentWillUpdate(nextProps, nextState) {
    }
    componentDidMount() {
    }
    createData(param) {
        if (!this.props.keyID || this.props.keyID == '') {
            message.warn('无key信息，请刷新重试');
            return;
        }
        if (!param) {
            message.warn('请输入信息');
            return;
        }
        param.keyID = this.props.keyID;
        return fetch.add(param);
    }
    updateData(param) {
        if (!this.props.editData || !Utils.ValueCheck.greateZero(this.props.editData.keyID)) {
            message.warn('请选择需更新信息');
            return;
        }
        if (!param) {
            message.warn('请输入信息');
            return;
        }
        //{id:,userLevelName:,isDefault:,repeatStdqMaxCount:}
        param.id = this.props.editData.keyID;
        return fetch.Update(param);
    }
    hideForm() {
        if (!!this.props.hideForm && typeof this.props.hideForm == 'function') {
            this.props.hideForm();
        }
    }
    getFormModule() {
        var formModule = {
            columns: this.state.columns, formTitle: '添加',
            submit: this.createData.bind(this), hideForm: this.hideForm.bind(this)
        };
        //edit
        if (!!this.props.editData && Utils.ValueCheck.greateZero(this.props.editData.userLevelID)) {
            var editColumns = PopUtils.MapEditColumns(this.props.editData, this.state.columns);
            formModule.formTitle = '更新';
            formModule.columns = editColumns;
            formModule.submit = this.updateData.bind(this);
        }
        return formModule;
    }
    render() {
        var formModule = this.getFormModule();
        return <PopForm wrappedComponentRef={(inst) => this.popForm = inst}
            formModule={formModule} visible={true} successCall={this.props.successCall} />
    }

}
