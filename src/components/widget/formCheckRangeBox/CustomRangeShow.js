/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/27
 */
import React, {useState} from "react";
import {Button, DatePicker, Input, Popover, Tag} from "antd";
import moment from "moment";
import {ExclamationCircleOutlined} from "@ant-design/icons";
const { RangePicker } = DatePicker

const inputStyle = {
    width: '126px',
    background: '#FFFFFF',
    borderRadius: '22px',
    textAlign: 'center'
}

const CustomRangeShow = (props) => {
    const {value, onChange, customRange, options} = props
    const [min, setMin] = useState('')
    const [max, setMax] = useState('')
    const [helpVisible, setHelpVisible] = useState(false)
    const [help, setHelp] = useState("")
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
                <div style={{marginTop: options?.length ? 6 : 0, display: options?.length ? 'block' : 'inline-block'}}>
                        <span>自定义</span>
                        <span style={{padding: '0 8px'}}>
                            <Popover visible={helpVisible} title={null} content={(<span><ExclamationCircleOutlined style={{color: '#faad14', marginRight: 6}} />{help}</span>)} placement='bottomRight'>
                                <Input style={inputStyle} placeholder="最低" value={min} onChange={e => changeValue(e, 'min')} />
                                <div className="transverseLine" />
                                <Input style={inputStyle} placeholder="最高" value={max} onChange={e => changeValue(e, 'max')} />
                            </Popover>
                        </span>
                    {customRange?.unit && <span>{customRange.unit}</span>}
                    <Button style={{marginLeft: 8, marginRight: 10}} className="handleBtn confirm" onClick={() => {
                        if (min.length === 0 || max.length === 0) return;
                        if (parseInt(min) > parseInt(max)){
                            setHelp('最高值不能小于最低值')
                            setHelpVisible(true)
                            setTimeout(() => setHelpVisible(false), 1500)
                        }else{
                            if (!(value || []).includes(`${min}${customRange.unit}-${max}${customRange.unit}`)){
                                onChange([...(value || []), `${min}${customRange.unit}-${max}${customRange.unit}`])
                            }else{
                                setHelp('不能添加重复的数据')
                                setHelpVisible(true)
                                setTimeout(() => setHelpVisible(false), 1500)
                            }
                            setMin('')
                        }
                        setMax('')
                    }}>确定</Button>
                    {value && value.length > 0 && (
                        <div style={{display: 'inline-flex', flexWrap: 'wrap', margin: '8.5px 0'}}>
                            {value.map((v, i) => <Tag style={{color: '#0084FF', margin: '0 10px', fontSize: 14, padding: 3, borderRadius: 3}} key={v + i} closable onClose={() => removeTag(v)}>{v}</Tag>)}
                        </div>
                    )}
                    </div>
            }
            {   customRange && customRange?.type === 'date' &&
                <div style={{marginTop: options?.length ? 6 : 0, display: options?.length ? 'block' : 'inline-block'}}>
                        <span>自定义</span>
                        <span style={{padding: '0 8px'}}>
                            <Popover visible={helpVisible} title={null} content={(<span><ExclamationCircleOutlined style={{color: '#faad14', marginRight: 6}} />{help}</span>)} placement='bottomRight'>
                                <RangePicker style={{width: 300}} value={date.length === 0 ? null : [moment(date[0]), moment(date[1])]} onChange={changeDate} />
                            </Popover>
                        </span>
                    {customRange?.unit && <span>{customRange.unit}</span>}
                    <Button style={{marginLeft: 8, marginRight: 10}} className="handleBtn confirm" onClick={() => {
                        if (date.length === 0) return;
                        if (!(value || []).includes(`${date[0]} ~ ${date[1]}`)){
                            onChange([...(value || []), `${date[0]} ~ ${date[1]}`])
                        }else{
                            setHelp('不能添加重复的数据')
                            setHelpVisible(true)
                            setTimeout(() => setHelpVisible(false), 1500)
                        }
                        setDate([])
                    }}>确定</Button>
                    {value && value.length > 0 && (
                        <div style={{display: 'inline-flex', flexWrap: 'wrap', margin: '8.5px 0'}}>
                            {value.map((v, i) => <Tag style={{color: '#0084FF', margin: '0 10px', fontSize: 14, padding: 3, borderRadius: 3}} key={v + i} closable onClose={() => removeTag(v)}>{v}</Tag>)}
                        </div>
                    )}
                    </div>
            }
        </>
    )
}
export default React.memo(CustomRangeShow)