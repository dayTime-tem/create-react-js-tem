/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/26
 */
import React from "react";
import { Form } from "antd";
import DetailsShow from "./customForm/DetailsShow"

const FormDetailsShow = (props) => {
    const { labelCol, wrapperCol, name, filed } = props
    return (
        <Form.Item
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            label={name}
            name={filed}
        >
            <DetailsShow {...props} />
        </Form.Item>
    )
}
export default FormDetailsShow