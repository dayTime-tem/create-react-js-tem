/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/28
 */
import React, {useRef, useState} from "react";
import { Button, Input, Empty } from "antd"
import { BasicModal } from "@/components/widget"
import classNames from "classnames";
import style from "./index.module.less"
import { CheckOutlined, PlusOutlined } from "@ant-design/icons"
import { confirm } from "@/utils"


const MultitermInputModal = (props) =>{
    const { value = [], onChange, name } = props
    const [active, setActive] = useState(-1)
    const [text, setText] = useState('')
    const modal = useRef()
    const showModal = () => {
        setActive(-1)
        modal.current?.showModal()
    }
    const closeModal = () => {
        modal.current?.closeModal()
    }
    const activeClick = (v, i) => {
        setActive(i)
        setText(v)
    }
    const changeText = (e) => {
        setText(e.target.value)
    }
    const save = () => {
        if (text.length === 0){
            return setActive(-1)
        }
        let tem = [...value]
        if (active === -2){
            tem.push(text)
        }else{
            tem[active] = text
        }
        onChange([...tem])
        setActive(-1)
    }
    const create = () => {
        if (active === -2) return ;
        setActive(-2)
        setText('')
    }
    const onRemove = (index) => {
        setActive(-1)
        setText('')
        confirm({
            title: "确认删除该项？",
            onOk: (close) => {
                onChange(value.filter((v, i) => i !== index ))
                close()
            }
        })
    }
    return (
        <>
            <div><Button type="primary" onClick={showModal}>添加{name}</Button><span style={{marginLeft: 8}}>当前 {value.length} 项</span></div>
            <BasicModal
                ref={modal}
                title={name}
                width={700}
                footer={<div><Button type="primary" onClick={closeModal}>关闭</Button></div>}
            >
                <div className={classNames(style.modal_main)}>
                    <div className={classNames(style.modal_main_content)}>
                        <div className={style.modal_main_content_ul}>
                            {   value && value.map((v, i) => (
                                <div className={classNames(style.modal_main_content_li, {[style.active]: active === i})} key={i}>
                                    <div className={classNames(style.li_content)} onClick={() => activeClick(v, i)}>
                                        {i + 1}： {v}
                                    </div>
                                    <div className={classNames(style.li_remove)} onClick={() => onRemove(i)}>
                                        删除
                                    </div>
                                </div>
                            ))}
                            {(!value || value.length === 0) && <Empty />}
                        </div>
                        <div><Button type="primary" onClick={create}><PlusOutlined />新建</Button></div>
                    </div>
                    <div className={classNames('verticalLine')} />
                    <div className={classNames(style.modal_main_content, {[style.hidden]: active === -1})}>
                        <Input.TextArea value={text} onChange={changeText} allowClear showCount maxLength={500} style={{height: 450}} />
                        <div><Button onClick={save} type="primary"><CheckOutlined />{text.length > 0 ? "保存" : "取消"}</Button></div>
                    </div>
                </div>
            </BasicModal>
        </>
    )
}
export default MultitermInputModal