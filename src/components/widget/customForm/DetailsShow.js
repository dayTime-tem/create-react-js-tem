/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/26
 */
import React, {useMemo, useState, useEffect} from "react";
import moment from 'moment';
import { Table } from "antd";
import { Img } from "@/components/widget"
import style from "./index.module.less"
import {isArray, isNoneVal} from "@/utils";

const DetailsShow = (props) => {
    const { value, type, resourceType, columns, rowKey, setLoading, form, pagination = false, widgetProps, onSearch, options, defaultDetails = "" } = props
    const handleColumns = useMemo(() => columns?.map(v => {
        const tem = {...v}
        tem.render = v.render ? (text, record, index) => v.render(text, record, index, {setLoading, form, data: value, widgetProps, onSearch}) : text => <div>{text}</div>
        return tem
    }), [columns, setLoading, form, value, widgetProps, onSearch])
    const [optionsMap, setOptionsMap] = useState({})
    useEffect(() =>{
        let tem = {defaultText: defaultDetails}
        options?.forEach(v => {
            tem[v.id] = v.name
        })
        setOptionsMap(tem)
    }, [options, defaultDetails])
    const showText = useMemo(() => {
        switch (type) {
            case "input":
                return <span>{!isNoneVal(value) ? value : defaultDetails}</span>
            case "date":
                return <span>{!isNoneVal(value) ? moment(value).format("YYYY-MM-DD") : defaultDetails}</span>
            case "select":
                return <span>{(!isNoneVal(value) && value?.length !== 0)
                    ? isArray(value) ? value.map(v => optionsMap[v]).join('、') : optionsMap[value]
                    : optionsMap.defaultText
                }</span>
            case "multitermInputModal":
                return <div>{(!isNoneVal(value) && (isArray(value) && value.length > 0))
                    ? value.map((v, i) => (<div key={i} style={{margin: '0 10px 12px'}}><span style={{marginRight: 6}}>{i + 1}:</span><span>{v}</span></div>))
                    : defaultDetails}</div>
            case "checkRange":
                return <span>{ !isNoneVal(value?.options) && (isArray(value?.options) && value?.options.length > 0) ?
                    value?.options?.map(v => optionsMap[v])?.join("、")
                    : optionsMap.defaultText
                }</span>
            case "cascader":
                return <span>{!isNoneVal(value) && (isArray(value) && value.length > 0)
                    ? value.join("/")
                    : defaultDetails
                }</span>
            case "resource":
                return (
                    <div>{resourceType === "img" && <Img data={value || []} width={140} />}
                        {resourceType === "video" && value?.map((v) => ( <video style={{display: "inline-block", padding: 8, boxSizing: "border-box"}} key={v.url} width={140} src={v.url} controls/>))}
                    </div>
                )
            case "table":
                return <div><Table rowKey={rowKey} columns={handleColumns} dataSource={value} {...{pagination}}/></div>
            default:
                return <span>{value}</span>
        }
    }, [type, value, handleColumns, rowKey, pagination, optionsMap, resourceType, defaultDetails])
    return (
        <>
            <div className={style.detailsShowBox}>
                {showText}
            </div>
        </>
    )
}
export default React.memo(DetailsShow)