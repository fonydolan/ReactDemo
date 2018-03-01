import React, { Component } from 'react'
import { httpUtil } from '../../axios/index'
import { Button, Form, Modal, Select, Input, InputNumber, Radio, Tooltip, Icon, message } from 'antd'
import 'antd/lib/form/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/tooltip/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/input-number/style/css';
import 'antd/lib/radio/style/css';
const FormItem = Form.Item;
const Option = Select.Option
const RadioGroup = Radio.Group;

//
const commonColumns = {
    key: '', name: '', initialValue: '', help: '', required: false, message: '',
    //编辑属性
    editAble: true, editKey: '',//修改和新增中key不同时候赋值
    rowDataKey: '',//行中数据获取key不同的时候使用
}
export const template = {
    formModule: { columns: [], formTitle: '', submit: function () { }, hideForm: function () { } },
    columns: {
        input: {
            commonColumns,
            type: 'input', placeholder: '',
        },
        inputnumber: {
            commonColumns,
            type: 'inputnumber', placeholder: '',
        },
        select: {
            commonColumns,
            type: 'select', options: [{ value: -1, label: '', disabled: false }],
        },
        radio: {
            commonColumns,
            //必须
            type: 'radio', options: [{ value: -1, label: '', disabled: false }],
        }
    }
}

class PopForm extends Component {
    constructor(props) {
        super(props);//{corpFlowID:}
        this.state = {
        }
    }
    componentWillUpdate(nextProps, nextState) {
    }
    componentDidMount() {
    }
    createNew(params) {
        if (!!this.props.formModule && !!this.props.formModule.submit && typeof this.props.formModule.submit == 'function') {
            var result = this.props.formModule.submit(params);
            if (!!result) {
                var title = this.props.formModule.formTitle || '操作';
                result.then(res => {
                    if (res.success) {
                        this.goHide();
                        message.success(title + "成功");
                        this.successCall();
                    } else {
                        message.error(res.msg || title + "出错");
                        this.failCall();
                    }
                }).catch(error => {
                    message.error(title + "出错");
                    this.failCall();
                });
            }
        }
    }
    goHide() {
        this.props.form.resetFields();
        if (!!this.props.formModule.hideForm && typeof this.props.formModule.hideForm == 'function') {
            this.props.formModule.hideForm();
        }
    }
    goSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
        });
        var param = this.props.form.getFieldsValue();
        this.createNew(param);
    }
    successCall() {
        if (!!this.props.successCall && typeof this.props.successCall == 'function') {
            this.props.successCall();
        }
    }
    failCall() {
        if (!!this.props.failCall && typeof this.props.failCall == 'function') {
            this.props.failCall();
        }
    }
    getSelectOptions(dataArray) {
        var options = [];
        options.push(<Option value="-1" key="-1">请选择</Option>);
        if (!!dataArray && dataArray.length > 0) {
            dataArray.map(d => {
                if (!!d.disabled) {
                    options.push(<Option key={d.value} value={d.value} disabled>{d.label}</Option>)
                } else {
                    options.push(<Option key={d.value} value={d.value} >{d.label}</Option>)
                }
            }
            );
        }
        return options;
    }
    getFormItemDom(item) {
        var dom = null;
        if (item.type == 'select') {
            dom = <Select size="large" style={{ width: 200 }} >
                {this.getSelectOptions(item.options)}
            </Select>
        } else if (item.type == 'input') {
            dom = <Input placeholder={item.placeholder} />
        } else if (item.type == 'inputnumber') {
            dom = <InputNumber placeholder={item.placeholder} min={item.min || 0}
                max={item.max || 999999999} precision={item.precision || 0} />
        } else if (item.type == 'radio') {
            dom = <RadioGroup options={item.options}>
            </RadioGroup>
        }
        return dom;
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;

        var visible = this.props.visible;
        var columns = [];
        var formTitle = '操作';
        if (!!this.props.formModule) {
            formTitle = this.props.formModule.formTitle || '操作';
            columns = this.props.formModule.columns || [];
        }
        var items = [];
        columns.forEach((item) => {
            if (!!item) {
                var itemRules = [];
                if (!!item.required) {
                    itemRules = [{ required: item.required, message: item.message || '请输入' }];
                }
                items.push(
                    <FormItem {...formItemLayout} label={item.name}
                        help={item.help} key={item.key} >
                        {getFieldDecorator(item.key, {
                            initialValue: item.initialValue,
                            rules: itemRules,
                        })(
                            this.getFormItemDom(item)
                            )}
                    </FormItem>
                )
            }
        });

        return <Modal visible={visible}
            title={formTitle}
            onOk={this.goSubmit.bind(this)}
            onCancel={this.goHide.bind(this)}
        >
            <Form ref="addForm" horizontal="true" >
                {items}
            </Form>
        </Modal>
    }

}

export const PopUtils = {
    MapEditColumns: function (editData, columns) {
        var editColumns = [];
        if (!!editData && !!columns && columns.length > 0) {
            columns.forEach((itemCol) => {
                if (!!itemCol && !!itemCol.key && !!itemCol.editAble) {
                    var itemEdit = itemCol;
                    if (!!itemCol.editKey) {
                        itemEdit.key = itemCol.editKey;
                    }
                    var rowDataKey = itemCol.key;
                    if (!!itemCol.rowDataKey) {
                        rowDataKey = itemCol.rowDataKey;
                    }
                    if (editData[rowDataKey] !== null && editData[rowDataKey] !== undefined
                        && editData[rowDataKey] !== '') {
                        itemEdit.initialValue = editData[rowDataKey];
                    }
                    editColumns.push(itemEdit);
                }
            });
        }
        return editColumns;
    }
}


export default PopForm = Form.create()(PopForm);
