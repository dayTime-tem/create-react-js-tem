/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/28
 */
/*
* 多项输入弹窗
* */
import React from "react";
import { Form } from "antd";
import MultitermInputModal from "./MultitermInputModal"

const FormMultitermInputModal = (props) => {
    const { labelCol, wrapperCol, name, filed, required, initialValue } = props
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
            <MultitermInputModal {...{name}} />
        </Form.Item>
    )
}
export default React.memo(FormMultitermInputModal)