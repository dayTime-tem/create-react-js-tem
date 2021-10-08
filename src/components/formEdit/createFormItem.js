/**
 * @Author: dayTimeAffect
 * @Date: 2021/8/2
 */
import React, { useCallback } from "react"
import {FormDate, FormInput, FormSelect, FormGetCode, FormGraphValidate, FormDetailsShow, FormCheckBox, FormCascader, FormRadio, FormMultitermInputModal} from "../widget";

import classNames from "classnames";
const formComponents = {
    input: FormInput,
    date: FormDate,
    select: FormSelect,
    getCode: FormGetCode,
    graphValidate: FormGraphValidate,
    check: FormCheckBox,
    cascader: FormCascader,
    radio: FormRadio,
    multitermInputModal: FormMultitermInputModal,
    // imgUpload: FormImageUpload,
    // videoUpload: FormVideoUpload,
    details: FormDetailsShow,
}
const defaultProps = {
    labelCol: {span: 5}, wrapperCol: {span: 17}
}

const CreateFormItem = ({ form, editFiled, record, setLoading, widgetProps, changeEditFiled }) =>{
    const createItem = useCallback((Component, params) => {
        const formProps = {...defaultProps, ...params}
        return (<Component {...formProps} {...{record}} {...{form, setLoading, widgetProps, changeEditFiled, editFiled}} />)
    }, [record, form, setLoading, widgetProps, changeEditFiled, editFiled])
    const createFormItems = useCallback(() => editFiled.map(v => (
        <div key={v.filed} className={classNames('third', 'i_b', v.className)}>
            {createItem(formComponents[v.details ? 'details' : v.type], v)}
        </div>
    )), [editFiled, createItem])
    return (
        <>
            {createFormItems(editFiled)}
        </>
    )
}
export default React.memo(CreateFormItem)