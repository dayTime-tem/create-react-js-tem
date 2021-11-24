/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/28
 */
import React, { useCallback, useEffect, useState, useRef } from "react"
import { FormInput, FormDate, FormSelect, FormSelectInput, FormCheckRangeBox, FormRadio } from "../widget"
import classNames from "classnames";
import style from "./index.module.less"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
const defaultProps = {
    labelCol: {span: 6}, wrapperCol: {span: 17}
}
const formComponents = {input: FormInput, date: FormDate, select: FormSelect, selectInput: FormSelectInput, checkRange: FormCheckRangeBox, radio: FormRadio}

const CreateFormItem = ({ form, searchFiled, filedFold }) =>{
    const [showFiled, setShowFiled] = useState([])
    const [hiddenFiled, setHiddenFiled] = useState([])
    const [spread, setSpread] = useState(0)
    const createItem = useCallback((Component, params) => (<Component {...defaultProps} {...params} form={form} />), [form])
    const createFormItems = useCallback((searchFiled) => searchFiled.map(v => (<div key={v.filed} className={classNames('third', 'i_b', v.className)}>{createItem(formComponents[v.type], v)}</div>)), [createItem])
    const hiddenBox = useRef()
    useEffect(() => {
        if (!searchFiled || searchFiled.length === 0) return;
        if (!filedFold){
            setShowFiled(searchFiled)
            setHiddenFiled([])
        }else{
            setShowFiled(searchFiled.slice(0, filedFold))
            setHiddenFiled(searchFiled.slice(filedFold))
        }
    }, [filedFold, searchFiled])
    const onSpread = () => {
        setSpread(spread > 0 ? 0 : hiddenBox.current?.scrollHeight)
    }
    return (
        <>
            <div>{createFormItems(showFiled)}</div>
            {filedFold && <div ref={hiddenBox} style={{height: `${spread}px`}} className={classNames(style.filed_box)}>{createFormItems(hiddenFiled)}</div>}
            {filedFold && <div className={style.spread}><span onClick={() => onSpread()}>{spread === 0 ? <span>展开更多  <DownOutlined /></span> : <span>收起  <UpOutlined /></span>}</span></div>}
        </>
    )
}
export default React.memo(CreateFormItem)
