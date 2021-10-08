/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/27
 */
import React from "react";
import { Form, Cascader } from "antd";

const FormCascader = (props) => {
    const { labelCol, wrapperCol, name, filed, required, initialValue, options = [], showSearch, disabled } = props
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
            <Cascader
                {...{showSearch, disabled, options}}
                placeholder={`请选择${name}`}
                allowClear
            />
        </Form.Item>
    )
}
export default React.memo(FormCascader)