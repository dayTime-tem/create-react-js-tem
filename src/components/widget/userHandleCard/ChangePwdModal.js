/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/15
 */
import React, {useRef} from "react";
import { BasicModal } from "../index"
import { FormEdit } from "../../index"
import classNames from "classnames";
import style from "./index.module.less";
import { changePassword } from "@/service"
import {md5, errorTip, successTip, clearLoginInfo} from "@/utils"
const validator = (value, callBack) => {
    let regNumber = /[0-9]/g
    let regCapitalLetter = /[A-Z]/g
    let regLowercaseLetter = /[a-z]/g
    if (!regNumber.test(value) || !regCapitalLetter.test(value) || !regLowercaseLetter.test(value)) return callBack('必须包含数字和大小写字母')
    return callBack()
}
const validatorTwice = (value, callBack, form) => {
    if (value !== form.getFieldValue('newPassword')) return callBack('两次密码输入不一致')
    return callBack()
}

const editFiled = [
    {
        filed: [
            {type: 'input', filed: 'password', name: '原密码', className: 'whole', required: true, inputType: 'password'},
            {type: 'input', filed: 'newPassword', name: '新密码', className: 'whole', required: true, minLen: 6, maxLen: 20, inputType: 'password', validator},
            {type: 'input', filed: 'twiceNewPassword', name: '确认新密码', className: 'whole', required: true, inputType: 'password', validator: validatorTwice},
        ]
    }
]

const ChangePwdModal = ({children, width}) => {
    const modal  = useRef()
    const form  = useRef()
    const changePwdBtn = () => {
        const { getForm } = form.current || {}
        getForm && getForm()?.resetFields()
        modal.current.showModal()
    }
    const onSubmit = (startLoad, closeLoad, closeModal) => {
        const { getForm } = form.current
        getForm().validateFields().then(data => {
            startLoad()
            const { password, newPassword } = data
            changePassword({old_password: md5(password), new_password: md5(newPassword)}).then(res => {
                closeLoad()
                getForm().resetFields()
                if (res.status !== window.state.SUCCESS) return errorTip(res.msg, "错误")
                successTip(res.message)
                clearLoginInfo()
            })
        }).catch(err => {})
    }
    return (
        <>
            {children ? <span onClick={changePwdBtn}>{children}</span> : <span className={classNames(style.changePwdBtn, style.btn)}>修改密码</span>}
            <BasicModal
                title={'修改密码'}
                ref={modal}
                asyncOk={onSubmit}
                okText="提交"
                cancelText="取消"
                width={width}
            >
                <FormEdit ref={form} editFiled={editFiled} />
            </BasicModal>
        </>
    )
}
export default ChangePwdModal