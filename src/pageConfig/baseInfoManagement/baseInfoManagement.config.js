/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/26
 */
import React from "react";
import { Button } from "antd"
import {baseInfoFindList, downloadFirmList, deleteFirm} from "../../service";
import { confirm, errorTip, successTip } from "@/utils"
import {AuthPermission} from "@/components";
export * from "./edit.config"


const options_1 = [
    {id: 1, name: 'xx'},
    {id: 2, name: 'xx'},
    {id: 3, name: 'xx'},
    {id: 4, name: 'xx'},
    {id: 5, name: 'xx'},
]
const options_2 = [
    {id: 1, name: 'xxx以内'},
    {id: 2, name: 'xxx-xxx'},
    {id: 3, name: 'xxx-xxx'},
    {id: 4, name: 'xxx-xxx'},
    {id: 5, name: 'xxx以上'},
]

const searchFiled = [
    {type: 'input', filed: "关键词", name: '关键词'},
    {type: 'date', filed: "时间", name: '时间'},
    {type: 'select', filed: "下拉框", name: '下拉框', options: options_1},
    {type: 'checkRange', filed: "checkRange组件", name: '复合组件1', className: 'whole', options: options_2, customRange: {type: 'text', unit: '单位'}, wrapperCol: {span: 18}},
]

const columns = [
    {
        title: '展现字段1',
        dataIndex: '展现字段1',
        key: '展现字段1',
        width: 300
    },
    {
        title: '展现字段2',
        dataIndex: '展现字段2',
        key: '展现字段2',
        render: (text, record) => (
            <div style={{display: "inline-block", textAlign: 'left'}}>
                自定义展示
            </div>
        ),
    },
    {
        title: '展现字段3',
        dataIndex: '展现字段3',
        key: '展现字段3',
        width: 240
    },
    {
        title: '展现字段4',
        dataIndex: '展现字段4',
        key: '展现字段4',
        width: 240
    },
    {
        title: '操作',
        dataIndex: '操作',
        key: '操作',
        render: (text, record, index, props) => (
            <div className="handleBtnBoX">
                <Button style={{width: 90}} onClick={() => props.history.push(props.history.location.pathname + '/info/' + text)}>更多详情</Button>
                <AuthPermission permission="can_add"><Button style={{width: 90}} onClick={() => props.history.push(props.history.location.pathname + '/edit/' + text)}>修改</Button></AuthPermission>
                <AuthPermission permission="can_delete"><Button style={{width: 90}} onClick={() => removeData(record, props)}>删除</Button></AuthPermission>
            </div>
        ),
        width: 330
    },
]

const beforeSearch = (params) => {
    console.log(params);
    return params
}

const removeData = (data, props) => {
    const { id } = data
    const { setLoading, onSearch } = props
    confirm({
        title: "确认删除？",
        onOk: (close) => {
            close()
            setLoading(true)
            deleteFirm({ids: [id]}).then(res => {
                setLoading(false)
                if (res.status !== 200) return errorTip(res.msg)
                onSearch()
                successTip()
            })
        }
    })
};

export const listSearchConfig = {
    searchFiled,
    columns,
    beforeSearch,
    tableParams: {
        pagination: true,
        rowKey: 'id',
        rowSelection: true, // 列表是否可勾选
    },
    addShow: 'can_add', //添加按钮
    removeShow: 'can_delete', // 批量删除按钮
    exportShow: true, // 导出按钮
    exportMethod: ({data, selectedRow}) => downloadFirmList({ids: (selectedRow.length === 0 ? data : selectedRow).map(v => v.id)}),//导出api接口
    searchMethod: baseInfoFindList,
    filedFold: 4, // 展示个数
    batchRemoveMethod: ({selectedRow}) => deleteFirm({ids: selectedRow.map(v => v.id)})
}
