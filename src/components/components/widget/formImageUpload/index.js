/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/19
 */
import React from "react";
import {Form} from "antd";
import ImageUpload from "../customForm/ImageUpload"
import { validatorCallBack } from "@/utils";


const FormImageUpload = (props) => {
    const { labelCol, wrapperCol, name, filed, required, initialValue, validator, form, dependencies } = props
    return (
        <Form.Item
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            label={name}
            required={required}
            rules={[
                { required: required, message: `${name}不能为空！` },
                { validator: validator ? (rule, value) => validator(value, validatorCallBack, form) : () => validatorCallBack() }
            ]}
            {...{initialValue, dependencies}} name={filed}
        >
            <ImageUpload />
        </Form.Item>
    )
}
export default FormImageUpload