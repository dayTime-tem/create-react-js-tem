/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/28
 */
import React, { useCallback } from "react"
import { FormInput, FormDate, FormSelect, FormSelectInput, FormCheckBox, FormRadio } from "../widget"
import classNames from "classnames";
const defaultProps = {
    labelCol: {span: 5}, wrapperCol: {span: 16}
}
const formComponents = {input: FormInput, date: FormDate, select: FormSelect, selectInput: FormSelectInput, check: FormCheckBox, radio: FormRadio}

const CreateFormItem = ({ form, searchFiled }) =>{
    const createItem = useCallback((Component, params) => (<Component {...defaultProps} {...params} form={form} />), [form])
    const createFormItems = useCallback(() => searchFiled.map(v => (<div key={v.filed} className={classNames('third', 'i_b', v.className)}>{createItem(formComponents[v.type], v)}</div>)), [searchFiled, createItem])
    return (
        <>
            {createFormItems(searchFiled)}
        </>
    )
}
export default React.memo(CreateFormItem)
