/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/26
 */

import React from "react";
import { Button } from "antd"
import moment from 'moment';
import style from './index.module.less'
import classNames from "classnames";
import * as editConfig from "./edit.config"
import { confirm, errorTip, successTip } from "@/utils";
import {baseList, deleteUser, resetPassword} from "../../service";

const power = {
    can_read: "查看",
    can_add: "新增",
    can_delete: "删除",
    is_admin: "超级管理员",
}


export const searchFiled = [
    { type: 'input', filed: "name", name: '用户名' },
    { type: 'input', filed: "permission", name: '权限名称关键字' },
]

export const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        align: 'center'
    },
    {
        title: '权限',
        dataIndex: 'profile',
        key: 'profile',
        align: 'center',
        render: (text, record, index, props) => (
            <div>
                <div>{Object.entries(text || {}).filter(v => v[1]).map(v => power[v[0]]).join("、")}</div>
            </div>
        ),
    },
    {
        title: '最后登录时间',
        dataIndex: 'last_login',
        key: 'last_login',
        align: 'center',
        render: text => <span>{text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : ''}</span>,
    },
    {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        render: (text, record, index, props) => (
            <div className={classNames(style.brBtn, 'handleBtnBoX')}>
                <Button onClick={() =>useChange(text, props)}>修改</Button>
                <Button onClick={() => delModel(record, props)}>删除</Button>
                <Button onClick={() => showModal(record, props)}>重置密码</Button>
            </div>
        ),
        width: 300
    },
]
const useChange=(id,props)=>{
    props.history.push(props.history.location.pathname + '/edit/' + id)
} 

const delModel = (r, props) => {
    const { id, username } = r
    const { setLoading, onSearch } = props
    confirm({
        icon: false,
        content: (
            <div className={classNames(style.brBtn)}>
                <div className={classNames(style.usehint)}>是否确认删除该账户</div>
                <div className={classNames(style.usename)}>用户名：{username}</div>
            </div>
        ),
        onOk: (close) => {
            close()
            setLoading(true)
            deleteUser({user_id: id}).then(res => {
                setLoading(false)
                if (res.status !== 200) return errorTip(res.msg)
                onSearch()
                successTip()
            })
        }
    })

}

const showModal = (r, props) => {
    const { username } = r
    const { setLoading } = props
    confirm({
        icon: false,
        content: (
            <div className={classNames(style.brBtn)}>
                <div className={classNames(style.usename)}>用户名：{username}</div>
                <div className={classNames(style.usehint)}>密码是否重置为:</div>
                <div className={classNames(style.usehint)} style={{ marginTop: 20 }}>Aa123456</div>
            </div>
        ),
        onOk: (close) => {
            close()
            setLoading(true)
            resetPassword({username}).then(res => {
                setLoading(false)
                if (res.status !== 200) return errorTip(res.msg)
                successTip()
            })
        }
    })

};

export const formSearchProps = {
    tableParams: {
        pagination: true,
        rowKey: 'id',
    },
    addShow: true, //新建
    searchMethod: baseList,
}
export {
    editConfig
}
