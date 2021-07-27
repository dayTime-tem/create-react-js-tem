/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/26
 */
import React, {useMemo} from "react";
import moment from 'moment';
import { Table } from "antd";
import { Img } from "@/components/widget"

const DetailsShow = (props) => {
    const { value, type, resourceType, columns, rowKey, setLoading, form, pagination = false, widgetProps, onSearch } = props
    const handleColumns = useMemo(() => columns?.map(v => {
        const tem = {...v}
        tem.render = v.render ? (text, record, index) => v.render(text, record, index, {setLoading, form, data: value, widgetProps, onSearch}) : text => <div>{text}</div>
        return tem
    }), [columns, setLoading, form, value, widgetProps, onSearch])
    return (
        <>
            { type === 'input' && <span>{value}</span>}
            { type === 'date' && <span>{moment(value).format("YYYY-MM-DD HH:mm:ss")}</span>}
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
        </>
    )
}
export default React.memo(DetailsShow)