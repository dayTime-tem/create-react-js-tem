/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/14
 */
import React from "react";
import { Form, DatePicker } from "antd";

const FormDate = (props) => {
    const { labelCol, wrapperCol, name, filed, required, initialValue, showTime } = props
    return (
        <Form.Item
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            label={name}
            name={filed}
            required={required}
            {...{initialValue}}
            rules={[{ required: required, message: `${name}不能为空！` }]}
        >
            <DatePicker {...{showTime}} />
        </Form.Item>
    )
}
export default React.memo(FormDate)