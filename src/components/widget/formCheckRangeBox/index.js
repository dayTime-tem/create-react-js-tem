/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/26
 */
import React from "react";
import { Form, Checkbox } from "antd";
import CustomRangeShow from "./CustomRangeShow"

const FormCheckRangeBox = (props) => {
    const { labelCol, wrapperCol, name, filed, required, initialValue, options = [], customRange } = props
    return (
        <Form.Item
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            label={name}
            required={required}
            rules={[{ required: required, message: `${name}不能为空！` }]}
        >
            <Form.Item noStyle name={[filed, 'options']} {...{initialValue}}>
                <Checkbox.Group>
                    {options.map(v => <Checkbox key={v.id} value={v.id}>{v.name}</Checkbox>)}
                </Checkbox.Group>
            </Form.Item>
            {
                <Form.Item noStyle name={[filed, 'customRange']}><CustomRangeShow options={options} customRange={customRange} /></Form.Item>
            }
        </Form.Item>
    )
}
export default React.memo(FormCheckRangeBox)