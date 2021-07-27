/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/16
 */
//找回密码
import React, {useRef, useState} from "react";
import {FormEdit} from "../../index";
import {BasicModal} from "../index";
import classNames from "classnames";
import { sendPhoneValidCode, checkNamePhoneAndCode, updatePassword } from "@/service"
import {errorTip, md5, successTip} from "@/utils";

const validator = (value, callBack) => {
    let regNumber = /[0-9]/g
    let regLetter = /[A-z]/g
    if (!regNumber.test(value) || !regLetter.test(value)) return callBack('必须包含数字和字母')
    return callBack()
}
const validatorTwice = (value, callBack, form) => {
    if (value !== form.getFieldValue('newPassword')) return callBack('两次密码输入不一致')
    return callBack()
}
const editFiled = [
    [
        {type: 'input', filed: 'loginName', name: '用户名', className: 'whole', required: true},
        {type: 'getCode', filed: 'phone', name: '手机号码', className: 'whole', required: true, validateFiled: ["loginName", "phone"], getCaptcha: sendPhoneValidCode},
        {type: 'input', filed: 'code', name: '验证码', className: 'whole', required: true},
    ],
    [
        {type: 'input', filed: 'newPassword', name: '新密码', className: 'whole', required: true, minLen: 8, inputType: 'password', validator},
        {type: 'input', filed: 'twiceNewPassword', name: '确认新密码', className: 'whole', required: true, inputType: 'password', validator: validatorTwice},
    ]
]
const FindPassWordModal = (props) => {
    const { children } = props
    const form  = useRef()
    const modal  = useRef()
    const [step, setStep] = useState(1)
    const [record, setRecord] = useState({loginName: '', phone: '', code: ''})
    const onSubmit = (startLoad, closeLoad, closeModal) => {
        const { getForm } = form.current
        getForm().validateFields().then(data => {
            startLoad()
            if (step === 1){
                checkNamePhoneAndCode({...data}).then(res => {
                    closeLoad()
                    if (res.status !== '0') return errorTip(res.message)
                    setStep(2)
                    setRecord({...data})
                })
            }else{
                updatePassword({newPassword: md5(data.newPassword), ...record}).then(res => {
                    closeLoad()
                    if (res.status !== '0') return errorTip(res.message)
                    closeModal()
                    getForm().resetFields()
                    successTip(res.message)
                })
            }
        }).catch(err => {})
    }
    const openModal = (showModal) => {
        setStep(1)
        form.current?.getForm().resetFields()
        showModal()
    }

    return (
        <BasicModal
            title={'修改密码'}
            ref={modal}
            asyncOk={onSubmit}
            customOpenButton={(showModal) => (<span onClick={() => openModal(showModal)}>{children}</span>)}
            okText="提交"
            cancelText="取消"
        >
            { step === 2 && <span className={classNames('warn_color')} style={{marginBottom: 12, display: 'block'}}>请设置新密码后登陆，密码不小于8位,必须包含字母和数字</span> }
            <FormEdit ref={form} editFiled={editFiled[step - 1]} />
        </BasicModal>
    )
}
export default FindPassWordModal