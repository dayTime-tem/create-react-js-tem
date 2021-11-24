/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/20
 */
import React, {useCallback} from "react";
import { Button } from "antd";
import style from './index.module.less'
import {errorTip, successTip, confirm} from "@/utils";
import {DownloadOutlined} from "@ant-design/icons"
import {AuthPermission} from "@/components";
import icon from "@/img/icon-2.png"
import classNames from "classnames";
import {CustomIcon} from "../widget";

const TableHandleBtns = (props) => {
    const { data, handleBtns, addShow, removeShow, history, selectedRow, setLoading, onSearch, exportShow, exportMethod, batchRemoveMethod } = props
    const skipAdd = () => {
        history.push(history.location.pathname + '/add')
    }
    const batchRemove = useCallback(() => {
        if (!batchRemoveMethod) return ;
        if (selectedRow.length === 0){
            errorTip('未选择数据')
        }else{
            confirm({
                title: "确认删除？",
                onOk: (close) => {
                    close()
                    setLoading(true)
                    batchRemoveMethod({selectedRow, onSearch}).then(res => {
                        setLoading(false)
                        if (!res) return;
                        if (res.status !== 200) return errorTip(res.msg)
                        onSearch()
                        successTip()
                    })
                }
            })

        }
    }, [selectedRow, setLoading, onSearch, batchRemoveMethod])
    const exportData = useCallback(() => {
        if (exportMethod){
            setLoading(true)
            exportMethod({data, selectedRow}).then(res => {
                setLoading(false)
            })
        }
    }, [exportMethod, setLoading, data, selectedRow])

    const defaultBtn = [
        {name: '新建', key: 'add', show: addShow, onclick: skipAdd, className: 'addBtn handleBtn'},
        {name: '批量删除', key: 'batchRemove', show: removeShow, onclick: batchRemove, className: 'removeBtn handleBtn'},
        {name: '导出', key: 'export', show: exportShow, onclick: exportData, icon: <DownloadOutlined />, className: 'exportBtn handleBtn'},
    ]

    return (
        <div className={style.container}>
            <div className="flex-left">
                <div className={classNames(style.handleName)}>
                    <CustomIcon icon={icon} /><span>管理操作</span>
                </div>
            </div>
            <div className="flex-right">
                <div className={style.defaultBtnBox}>{defaultBtn.map(v => v.show ? <AuthPermission permission={typeof v.show === 'boolean' ? undefined : v.show} key={v.key}><Button onClick={v.onclick} className={classNames(style.independent, v.className)}>{v.name}</Button></AuthPermission> : null)}</div>
                <div>{handleBtns.map(v => (v.custom ? v.custom({...props}) : <Button key={JSON.stringify(v)}>{v.showText}</Button>))}</div>
            </div>
        </div>
    )
}
export default React.memo(TableHandleBtns)