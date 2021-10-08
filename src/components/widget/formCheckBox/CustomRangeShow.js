/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/27
 */
import React, {useState} from "react";
import {Button, DatePicker, Input, Popover, Tag} from "antd";
import moment from "moment";
import {ExclamationCircleOutlined} from "@ant-design/icons";
const { RangePicker } = DatePicker
const help = <span><ExclamationCircleOutlined style={{color: '#faad14', marginRight: 6}} />最高值不能小于最低值</span>

const CustomRangeShow = (props) => {
    const {value, onChange, customRange} = props
    const [min, setMin] = useState('')
    const [max, setMax] = useState('')
    const [helpVisible, setHelpVisible] = useState(false)
    const [date, setDate] = useState([])
    const changeValue = (e, type) => {
        if (!/[^0-9]/g.test(e.target.value) && e.target.value.length < 8){
            type === 'min' ? setMin(e.target.value) : setMax(e.target.value)
        }
    }
    const changeDate = (e) => {
        if (!e)return setDate([]);
        setDate([e[0]?.format('YYYY-MM-DD'), e[1]?.format('YYYY-MM-DD')])
    }
    const removeTag = (item) => {
        let tem = value.filter(v => v !== item)
        onChange([...tem])
    }
    return (
        <>
            {   customRange && customRange?.type === 'text' &&
                <span style={{marginLeft: 8, display: 'inline-block'}}>
                        <span>自定义</span>
                        <span style={{padding: '0 8px'}}>
                            <Popover visible={helpVisible} title={null} content={(help)} placement='bottomRight'>
                                <Input style={{ width: 100, textAlign: 'center' }} placeholder="最低" value={min} onChange={e => changeValue(e, 'min')} />
                                <Input style={{width: 30, borderLeft: 0, borderRight: 0, pointerEvents: 'none',}} placeholder="-" disabled />
                                <Input style={{width: 100, textAlign: 'center'}} placeholder="最高" value={max} onChange={e => changeValue(e, 'max')} />
                            </Popover>
                        </span>
                    {customRange?.unit && <span>{customRange.unit}</span>}
                    <Button style={{marginLeft: 8}} type="primary" ghost onClick={() => {
                        if (min.length === 0 || max.length === 0) return;
                        if (parseInt(min) > parseInt(max)){
                            setHelpVisible(true)
                            setMax('')
                            setTimeout(() => setHelpVisible(false), 1500)
                        }else{
                            let tem = value ? [...value, `${min}${customRange.unit}-${max}${customRange.unit}`] : [`${min}${customRange.unit}-${max}${customRange.unit}`]
                            onChange([...tem])}
                    }}>确定</Button>
                    </span>
            }
            {   customRange && customRange?.type === 'date' &&
                <span style={{marginLeft: 8, display: 'inline-block'}}>
                        <span>自定义</span>
                        <span style={{padding: '0 8px'}}>
                            <RangePicker style={{width: 300}} value={date.length === 0 ? null : [moment(date[0]), moment(date[1])]} onChange={changeDate} />
                        </span>
                    {customRange?.unit && <span>{customRange.unit}</span>}
                    <Button style={{marginLeft: 8}} type="primary" ghost onClick={() => {
                        if (date.length === 0) return;
                        let tem = value ? [...value, `${date[0]} ~ ${date[1]}`] : [`${date[0]} ~ ${date[1]}`]
                        onChange([...tem])
                    }}>确定</Button>
                    </span>
            }
            {value && value.length > 0 && (
                <div>
                    {value.map((v, i) => <Tag style={{borderColor: '#0084FF', color: '#0084FF', margin: 4, fontSize: 14}} key={v + i} closable onClose={() => removeTag(v)}>{v}</Tag>)}
                </div>
            )}
        </>
    )
}
export default React.memo(CustomRangeShow)