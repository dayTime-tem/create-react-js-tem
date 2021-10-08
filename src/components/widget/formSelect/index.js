/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/14
 */
import React from "react";
import { Form, Select } from "antd";
const { Option } = Select

const FormSelect = (props) => {
    const { labelCol, wrapperCol, name, filed, required, initialValue, options = [], showSearch, disabled, mode } = props
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
            <Select
                {...{showSearch, disabled}}
                placeholder={`请选择${name}`}
                allowClear
                mode={mode}
                maxTagCount={1}
            >
                {options.map(v => (
                    <Option key={v.id} value={v.id}>{v.name}</Option>
                ))}
            </Select>
        </Form.Item>
    )
}
export default FormSelect