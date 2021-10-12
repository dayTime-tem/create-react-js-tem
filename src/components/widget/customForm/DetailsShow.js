/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/26
 */
import React, {useMemo, useState, useEffect} from "react";
import moment from 'moment';
import { Table } from "antd";
import { Img } from "@/components/widget"
import style from "./index.module.less"

const DetailsShow = (props) => {
    const { value, type, resourceType, columns, rowKey, setLoading, form, pagination = false, widgetProps, onSearch, options } = props
    const handleColumns = useMemo(() => columns?.map(v => {
        const tem = {...v}
        tem.render = v.render ? (text, record, index) => v.render(text, record, index, {setLoading, form, data: value, widgetProps, onSearch}) : text => <div>{text}</div>
        return tem
    }), [columns, setLoading, form, value, widgetProps, onSearch])
    const [optionsMap, setOptionsMap] = useState({})
    useEffect(() =>{
        let tem = {}
        options?.forEach(v => {
            tem[v.id] = v.name
        })
        setOptionsMap(tem)
    }, [options])
    return (
        <>
            <div className={style.detailsShowBox}>
                { type === 'input' && <span>{value}</span>}
                { type === 'date' && <span>{value ? moment(value).format("YYYY-MM-DD HH:mm:ss") : ""}</span>}
                { type === 'select' && <span>{Object.prototype.toString.call(value).includes("Array") ? value.map(v => optionsMap[v]).join('、') : optionsMap[value]}</span>}
                { type === 'multitermInputModal' && <div>{value?.map((v, i) => (<div key={i} style={{margin: '0 10px 12px'}}><span style={{marginRight: 6}}>{i + 1}:</span><span>{v}</span></div>))}</div>}
                { type === 'check' && <span>{value?.options?.map(v => optionsMap[v])?.join("、")}</span>}
                { type === 'cascader' && <span>{value?.join("/")}</span>}
                { type === 'resource' && resourceType === 'img' && (
                    <div><Img data={value || []} width={140} /></div>
                )}
                { type === 'resource' && resourceType === 'video' && (
                    <div>
                        {value?.map((v) => (
                            <video
                                style={{display: "inline-block", padding: 8, boxSizing: "border-box"}}
                                key={v.url}
                                width={140}
                                src={v.url}
                                controls
                            />
                        ))}
                    </div>
                )}
                { type === 'table' && (
                    <div>
                        <Table
                            rowKey={rowKey}
                            columns={handleColumns}
                            dataSource={value}
                            {...{pagination}}
                        />
                    </div>
                ) }
            </div>
        </>
    )
}
export default React.memo(DetailsShow)