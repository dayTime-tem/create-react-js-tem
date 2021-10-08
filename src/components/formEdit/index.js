/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/15
 */
import React, {useCallback, useEffect, useImperativeHandle, useState} from "react";
import {Form} from "antd";
import {errorTip} from "@/utils"
import CreateFormItem from "./createFormItem";

const FormEdit = (props, ref) =>{
    const { editFiled = [], editForm = {}, editProps = {}, record, searchMethod, beforeSearch, beforeShowData, setLoading, editFiledValue, widgetProps, type, id } = props
    const [editValue, setEditValue] = useState({})
    const [showFiled, changeShowFiled] = useState(editFiled)
    const [form] = Form.useForm();
    const onSearch = useCallback((value) => {
        const searchParams = beforeSearch ? beforeSearch({...value, record, id}) : {...value, record, id}
        if (searchParams && searchMethod){
            setLoading && setLoading(true)
            searchMethod(searchParams).then(res => {
                setLoading && setLoading(false)
                if (res.status !== 200) return errorTip(res.message)
                const data = beforeShowData ? beforeShowData(res.data, {type}) : res.data
                setEditValue(data)
            })
        }
    }, [beforeSearch, beforeShowData, record, searchMethod, setLoading, id, type])
    
    useEffect(() => {
        changeShowFiled(editFiled)
    }, [editFiled])
    useEffect(() => {
        Object.keys(editValue || {}).length && form.setFieldsValue({...editValue})
    }, [editValue, form])
    useEffect(() => {
        Object.keys(editFiledValue || {}).length && form.setFieldsValue({...editFiledValue})
    }, [editFiledValue, form])
    useEffect(() => {
        if (type !== 'add'){
            searchMethod && onSearch()
        }
    }, [onSearch, searchMethod, type])

    const getForm = () => form
    const submit = () => {
        return new Promise(resolve => {
            const { validateFields } = form
            const { beforeEdited } = editProps
            validateFields().then((res) => {
                resolve(beforeEdited ? beforeEdited(res) : res)
            }).catch((err) => console.log(err))
        })
    }
    const changeEditFiled = useCallback((newEditFiled) => {
        if (newEditFiled) changeShowFiled(newEditFiled)
        return { showFiled, changeShowFiled  }
    }, [showFiled])
    useImperativeHandle(ref, () => {
        return { getForm, submit, onSearch, changeEditFiled }
    })
    return (
        <Form form={form} {...editForm}>
            {showFiled.map((v, i) => (
                <div key={v.title + i}>
                    <div style={{fontSize: 16, fontWeight: 600}}>{v.title}</div>
                    <CreateFormItem {...{ form, editFiled: v.filed, record, setLoading, widgetProps, changeEditFiled }} />
                </div>
            ))}

        </Form>
    )
}
export default React.forwardRef(FormEdit)