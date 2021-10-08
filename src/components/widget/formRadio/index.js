/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/27
 */
import React from "react";
import { Form, Radio } from "antd";

const FormRadio = (props) => {
    const { labelCol, wrapperCol, name, filed, required, initialValue, options = [], radioType } = props
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
            <Radio.Group>
                {radioType === 'button' ? options.map(v => (<Radio.Button value={v.id} key={v.id}>{v.name}</Radio.Button>)) : options.map(v => (<Radio value={v.id} key={v.id}>{v.name}</Radio>))}
            </Radio.Group>
        </Form.Item>
    )
}
export default React.memo(FormRadio)