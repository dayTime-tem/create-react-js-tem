/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/15
 */
import React, {useState} from "react";
import { Form, Select, Input } from "antd";
const { Option } = Select

const FormSelectInput = (props) => {
    const { labelCol, wrapperCol, name, filed, required, options = [], showSearch, form } = props
    const [tip, setTip] = useState('关键字')
    const clearInput = () => {
        const { setFieldsValue } = form
        setFieldsValue({
            [filed[0] + '_' + filed[1]]: {[filed[1]]: ''}
        })
    }
    return (
        <Form.Item
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            label={name}
            required={required}
        >
            <Input.Group compact>
                <div style={{display: "flex"}}>
                    <Form.Item name={[filed[0] + '_' + filed[1], filed[0]]} noStyle>
                        <Select
                            style={{flex: 1}}
                            {...{showSearch}}
                            placeholder={`请选择${name}`}
                            onChange={(v, option) =>{
                                setTip(option?.text)
                                clearInput()
                            }}
                            allowClear
                        >
                            {options.map(v => (
                                <Option key={v.id} value={v.id} text={v.name}>{v.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name={[filed[0] + '_' + filed[1], filed[1]]} noStyle>
                        <Input style={{flex: 2}} placeholder={`请输入${tip || '关键字'}`} />
                    </Form.Item>
                </div>
            </Input.Group>
        </Form.Item>
    )
}
export default FormSelectInput