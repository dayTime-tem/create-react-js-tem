/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/20
 */
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import style from './index.module.less'

const TableHandleBtns = (props) => {
    const { handleBtns, onSearch, autoRefresh = false, autoRefreshTime = 60, componentStatus } = props
    const [refreshTime, setRefreshTime] = useState(autoRefreshTime)
    useEffect(() => {
        let task
        if (autoRefresh){
            if (componentStatus === 1){
                setRefreshTime(autoRefreshTime)
            }else if (refreshTime >= 1 && componentStatus === 0){
                task = setTimeout(() => setRefreshTime(Math.max(refreshTime - 1, 0)), 1000)
            }else if (refreshTime === 0){
                onSearch()
            }
        }
        return () => {
            clearTimeout(task)
        }
    }, [autoRefresh, autoRefreshTime, componentStatus, onSearch, refreshTime])
    return (
        <div className={style.container}>
            <div>{handleBtns.map(v => (v.custom ? v.custom({...props}) : <Button key={JSON.stringify(v)}>{v.showText}</Button>))}</div>
            <div>
                <div>{ autoRefresh && <Button style={{width: 108}} onClick={() => onSearch()}>刷新 {refreshTime}s</Button> }</div>
            </div>
        </div>
    )
}
export default React.memo(TableHandleBtns)