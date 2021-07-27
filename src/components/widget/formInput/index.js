/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/14
 */
import React from "react";
import { Form, Input } from "antd";
import { validatorCallBack, initialValueCallBack } from "@/utils";


const FormInput = (props) => {
    const { labelCol, wrapperCol, name, filed, required, initialValue, minLen, maxLen, inputType = 'text', validator, validateTrigger = 'onBlur', form, record, details } = props
    const rules = [
        { required: required, message: `${name}不能为空！` },
        { min: minLen, message: `${name}最少${minLen}位！`, type: 'string' },
        { validator: validator ? (rule, value) => validator(value, validatorCallBack, form) : () => validatorCallBack() }
    ]
    return (
        <Form.Item
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            label={name}
            required={required}
        >
            { details ?
                <span>{form.getFieldValue(filed)}</span> :
                <>
                    {inputType === 'password' &&
                    <Form.Item name={filed} {...{initialValue, rules, validateTrigger}} noStyle><Input.Password placeholder={`请输入${name}`} /></Form.Item>
                    }
                    {inputType === 'textArea' &&
                    <Form.Item name={filed} {...{initialValue, rules, validateTrigger}} noStyle><Input.TextArea maxLength={maxLen} placeholder={`请输入${name}`} showCount autoSize={{minRows: 3, maxRows: 6}} /></Form.Item>
                    }
                    {inputType === 'text' &&
                    <Form.Item name={filed} {...{initialValue: initialValueCallBack({initialVal: initialValue, props: { form, record }}), rules, validateTrigger}} noStyle><Input maxLength={maxLen} placeholder={`请输入${name}`} /></Form.Item>
                    }
                </>
            }
        </Form.Item>
    )
}
export default FormInput