/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/20
 */
import React, {useCallback} from "react";
import { Button } from "antd";
import style from './index.module.less'
import {errorTip, successTip} from "@/utils";
import {DownloadOutlined} from "@ant-design/icons"

const TableHandleBtns = (props) => {
    const { data, handleBtns, addShow, removeShow, history, selectedRow, setLoading, onSearch, exportShow, exportMethod, config } = props
    const skipAdd = () => {
        history.push(history.location.pathname + '/add')
    }
    const batchRemove = useCallback(() => {
        console.log(selectedRow);
        if (selectedRow.length === 0){
            errorTip('未选择数据')
        }else{
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                successTip('操作成功')
                onSearch()

            }, 1000)
        }
    }, [selectedRow, setLoading, onSearch])
    const exportData = useCallback(() => {
        if (exportMethod){
            setLoading(true)
            exportMethod(data).then(res => {
                if (res.status !== window.state.SUCCESS) return errorTip(res.msg)
                return successTip(res.msg || '操作成功')
            })
        }
    }, [exportMethod, setLoading, data])
    const addName = useCallback(()=>{
        if(config === 'systemManagement'){
            return '添加账号'
        }
        return '新建'
    }, [config])
    const defaultBtn = [
        {name: addName(), key: 'add', permission: '', show: addShow, onclick: skipAdd},
        {name: '批量删除', key: 'batchRemove', permission: '', show: removeShow, onclick: batchRemove},
    ]
    const functionHandle = [
        {name: '导出', key: 'export', permission: '', show: exportShow, onclick: exportData, icon: <DownloadOutlined />},
    ]

    return (
        <div className={style.container}>
            <div className="flex-left">
                <div className={style.defaultBtnBox}>{defaultBtn.map(v => v.show ? <Button onClick={v.onclick} className={style.independent} key={v.key}>{v.name}</Button> : null)}</div>
                <div>{handleBtns.map(v => (v.custom ? v.custom({...props}) : <Button key={JSON.stringify(v)}>{v.showText}</Button>))}</div>
            </div>
            <div className="flex-right">
                <div className={style.functionHandleBox}>{functionHandle.map(v => v.show ? <Button onClick={v.onclick} className={style.independent} key={v.key}>{v.icon}{v.name}</Button> : null)}</div>
            </div>
        </div>
    )
}
export default React.memo(TableHandleBtns)