/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/26
 */

 import React from "react";
 import { Button } from "antd"
 import moment from 'moment';
 import * as editConfig from "./edit.config"
import {confirm, errorTip, successTip} from "@/utils";


export const searchFiled = [
    {type: 'input', filed: "usename", name: '用户名', wrapperCol: {span: 12}},
    {type: 'input', filed: "keyword", name: '名称关键字', wrapperCol: {span: 12}},
 ]
 
 export const columns = [
    {
        title: '用户名',
        dataIndex: '企业名称',
        key: '企业名称',
        align:'center'
    },
    {
        title: '权限',
        dataIndex: '权限',
        key: '权限',
        align:'center',
        render: (text, record, index, props) => (
            <div>
                <div>新建查看删除</div>
            </div>
        ),
    },
    {
        title: '最后登录时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align:'center',
        render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
        title: '操作',
        dataIndex: '操作',
        key: '操作',
        align:'center',
        render: (text, record, index, props) => (
            <div className="handleBtnBoX" style={{display: 'flex', flexDirection: 'column'}}>
                <Button onClick={() => props.history.push(props.history.location.pathname + '/edit/' + 0)}>修改</Button>
                <Button onClick={()=>{console.log(record)}}>删除</Button>
                <Button onClick={()=>showModal(record, props)}>重置密码</Button>
            </div>
        ),
        width: 300
    },
]
const showModal = (v, props) => {
   const { setLoading, onSearch } = props
    confirm({
        content: (
            <div>
                <div>用户名：XXX</div>
                <div>密码是否重置为</div>
                <div style={{fontWeight: 600}}>Aa123456</div>
            </div>
        ),
        onOk: (close) => {
            close()
            setLoading(true)
            // 模拟发请求
            let res = {status: 200}
            setTimeout(() => {
                //页面刷新
                if (res.status !== 200) return errorTip(res.message)
                onSearch()
                successTip()
                setLoading(false)
            }, 1000)
        }
    })
 };


 const beforeSearch = (params) => {
    console.log(params);
    return params
}
 export const formSearchProps = {
    beforeSearch,
    tableParams: {
        pagination: true,
        rowKey: 'id',
        // rowSelection: true, // 列表是否可勾选
    },
    addShow: true, //新建
    // removeShow: true, // 批量删除按钮
    // searchMethod: getPoliticalList,
}
export {
    editConfig
}
