/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/16
 */
import React, {useCallback, useRef, useState} from "react";
import { BasicModal } from "@/components/widget"
import {Button} from "antd";
import {FormEdit} from "../../components";
import { saveReply } from "@/service"
import { errorTip, successTip } from "@/utils"

const editFiled = [
    {type: 'input', filed: 'replyUser', name: '回复者名称', className: 'whole', required: true, wrapperCol: {span: 20}, maxLen: 50},
    {type: 'input', inputType: 'textArea', filed: 'content', name: '回复内容', required: true, className: 'whole', wrapperCol: {span: 20}, maxLen: 1000},
]
const ReplyModal = (props) => {
    const { record, onSearch } = props
    const form  = useRef()
    const modal  = useRef()

    const openModal = (showModal) => {
        showModal()

    }
    const onSubmit = (startLoad, closeLoad, closeModal) => {
        const { getForm } = form.current
        getForm().validateFields().then(data => {
            startLoad()
            saveReply({...data, cluePoliticalId: record.id}).then(res => {
                closeLoad()
                if (res.status !== '0') return errorTip(res.message, '无法操作')
                closeModal()
                onSearch && onSearch()
                return successTip(res.message)
            })
        }).catch(err => {})
    }
    const closeCallBack = () =>{
        // 关闭模态框
    }
    const setLoading = useCallback((b) => {
        return b ? modal.current?.startLoad() : modal.current?.closeLoad()
    }, [])
    return (
        <BasicModal
            title={'回复'}
            okText="确定"
            cancelText="关闭"
            customOpenButton={(showModal) => (<Button type="primary" onClick={() => openModal(showModal)}>回复</Button>)}
            asyncOk={onSubmit}
            maxHeight={500}
            width={700}
            destroyOnClose
            closeCallBack={closeCallBack}
            ref={modal}
        >
            <FormEdit ref={form} {...{record, editFiled, setLoading}}
                      editForm={{
                          layout: 'vertical'
                      }}
            />

        </BasicModal>
    )
}
export default React.memo(ReplyModal)