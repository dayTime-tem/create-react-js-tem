/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/16
 */
import React, {useEffect, useState} from "react";
import {Form, Input, Button} from "antd";
import { validationPhone, validationEmail, validatorCallBack, sleep, errorTip } from "@/utils";
import { debounce } from "lodash"

const FormGetCode = (props) => {
    const { labelCol, wrapperCol, name, filed, required, time = 60, codeType = 'phone', form, validateFiled, getCaptcha } = props
    const [showTime, setShowTime] = useState(false)
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (showTime){
            let next = Math.max(count - 1, -1)
            if (next === -1){
                setShowTime(false)
            }else{
                sleep(1000).then(() => setCount(next))
            }
        }
    }, [count, showTime])

    const onSend = debounce(() => {
        const { validateFields } = form
        validateFields(validateFiled ? validateFiled : [filed]).then(data => {
            if (getCaptcha){
                getCaptcha(data).then(res => {
                   if (res.status !== '0') return errorTip(res.message)
                    setCount(time)
                    setShowTime(true)
                })
            }
        }).catch(err => {})
    }, 300)

    return (
        <Form.Item
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            label={name}
            required={required}
        >
            <div style={{display: "flex", justifyContent: 'space-between'}}>
                <Form.Item
                    name={filed}
                    rules={[
                        { required: required, message: `${name}不能为空！` },
                        { validator: (rule, value) => {
                                if (codeType === 'phone' && !validationPhone(value)) return validatorCallBack('请输入正确电话号码');
                                if (codeType === 'email' && !validationEmail(value)) return validatorCallBack('请输入正确邮箱');
                                return validatorCallBack()
                            } }
                    ]}
                    validateTrigger={false}
                    noStyle
                >
                    <Input style={{flex: 1, marginRight: 12}} placeholder={`请输入${name}`} />
                </Form.Item>
                <Button style={{width: 108}} onClick={onSend} disabled={showTime} type="primary">
                    <span>{!showTime ? '获取验证码' : `${count} 秒后可重发`}</span>
                </Button>
            </div>
        </Form.Item>
    )
};
export default FormGetCode