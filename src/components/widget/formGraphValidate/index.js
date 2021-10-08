/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/16
 */
import React, {useEffect, useState} from "react";
import {Form, Input, Spin} from "antd";
import { debounce } from "lodash"

const FormGraphValidate = (props) => {
    const { labelCol, wrapperCol, name, filed, required, getCaptcha, getCallBack } = props
    const [loading, setLoading] = useState(false)
    const [captcha, setCaptcha] = useState('')

    const onSend = debounce(() => {
        if (!getCaptcha) return ;
        setLoading(true)
        getCaptcha().then(res => {
            getCallBack && getCallBack(res)
            const { data } = res
            setCaptcha(data?.image)
            setLoading(false)
        })
    }, 300)

    useEffect(() => {
        if (!getCaptcha) return ;
        setLoading(true)
        getCaptcha().then(res => {
            getCallBack && getCallBack(res)
            setLoading(false)
            const { data } = res
            setCaptcha(data?.image)
        })
    }, [getCallBack, getCaptcha])

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
                    ]}
                    validateTrigger='onBlur'
                    noStyle
                >
                    <Input style={{flex: 1, marginRight: 12}} autocomplete="off" placeholder={`请输入${name}`} />
                </Form.Item>
                <Spin spinning={loading}>
                    <div style={{width: 100, border: '1px solid #d9d9d9', height: 32, cursor: 'pointer'}} onClick={onSend}>
                        <img style={{width: 98, height: 30}} src={captcha} alt=""/>
                    </div>
                </Spin>
            </div>
        </Form.Item>
    )
};
export default FormGraphValidate