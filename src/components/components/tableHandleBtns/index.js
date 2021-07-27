/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/20
 */
import React from "react";
import { Button } from "antd";
import style from './index.module.less'
const TableHandleBtns = (props) => {
    const { handleBtns } = props
    return (
        <div className={style.container}>{handleBtns.map(v => (
            v.custom ? v.custom({...props}) : <Button key={JSON.stringify(v)}>{v.showText}</Button>
        ))}</div>
    )
}
export default React.memo(TableHandleBtns)