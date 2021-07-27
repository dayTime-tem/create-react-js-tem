/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/15
 */
import React, {useCallback, useEffect, useImperativeHandle, useState} from "react";
import {Form} from "antd";
import {FormDate, FormInput, FormSelect, FormGetCode, FormGraphValidate, FormDetailsShow} from "../widget";
import classNames from "classnames";
import {getUrlParams, errorTip} from "@/utils"
const formComponents = {
    input: FormInput,
    date: FormDate,
    select: FormSelect,
    getCode: FormGetCode,
    graphValidate: FormGraphValidate,
    details: FormDetailsShow,
}
const defaultProps = {
    labelCol: {span: 5}, wrapperCol: {span: 17}
}
const FormEdit = (props, ref) =>{
    const { editFiled = [], editForm = {}, record, searchMethod, beforeSearch, beforeShowData, setLoading, editFiledValue, widgetProps } = props
    const [editValue, setEditValue] = useState({})
    const [form] = Form.useForm();
    const onSearch = useCallback((value) => {
        const searchParams = beforeSearch ? beforeSearch({...getUrlParams(), ...value, record}) : {...getUrlParams(), ...value}
        if (searchParams && searchMethod){
            setLoading && setLoading(true)
            searchMethod(searchParams).then(res => {
                setLoading && setLoading(false)
                if (res.status !== '0') return errorTip(res.message)
                const data = beforeShowData ? beforeShowData(res.data) : res.data
                setEditValue(data)
            })
        }
    }, [beforeSearch, beforeShowData, record, searchMethod, setLoading])
    const createItem = useCallback((Component, params) => {
        const formProps = {...defaultProps, ...params}
        return (<Component {...formProps} {...{record}} {...{form, setLoading, onSearch, widgetProps}} />)
    }, [form, onSearch, record, setLoading, widgetProps])
    const createFormItems = useCallback(() => editFiled.map(v => (
        <div key={v.filed} className={classNames('third', 'i_b', v.className)}>
            {createItem(formComponents[v.details ? 'details' : v.type], v)}
        </div>
    )), [editFiled, createItem])

    useEffect(() => {
        Object.keys(editValue || {}).length && form.setFieldsValue({...editValue})
    }, [editValue, form])
    useEffect(() => {
        Object.keys(editFiledValue || {}).length && form.setFieldsValue({...editFiledValue})
    }, [editFiledValue, form])
    useEffect(() => {
        onSearch()
    }, [onSearch])

    const getForm = () => form
    const submit = () => {
        return new Promise(resolve => {
            const { validateFields } = form.current
            const { beforeEdited } = editForm
            validateFields().then(res => {
                resolve(beforeEdited ? beforeEdited(res) : res)
            }).catch((err) => resolve(err))
        })
    }
    useImperativeHandle(ref, () => {
        return { getForm, submit, onSearch }
    })
    return (
        <Form form={form} {...editForm}>
            {createFormItems(editFiled)}
        </Form>
    )
}
export default React.forwardRef(FormEdit)