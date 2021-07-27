/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/14
 */
import React, {useCallback, useEffect, useMemo, useState} from "react";
import { Form, Button } from "antd"
import { FormInput, FormDate, FormSelect, BasicTable, FormSelectInput } from "../widget"
import style from "./index.module.less"
import classNames from "classnames";
import { TableHandleBtns } from "@/components"
import { getUrlParams, errorTip } from "@/utils";

const { Item } = Form
const defaultProps = {
    labelCol: {span: 5}, wrapperCol: {span: 16}
}
const formComponents = {input: FormInput, date: FormDate, select: FormSelect, selectInput: FormSelectInput}

const FormSearch = (props) => {
    const {
        searchFiled,
        handleBtns = [],
        columns,
        tableParams = {rowKey: 'id'},
        setLoading,
        beforeSearch,
        location: { search },
        history,
        searchMethod,
        setSearchFiled,
        beforeShowData
    } = props
    const [form] = Form.useForm();
    const [data, setData] = useState([]) // table列表数据
    const [originalData, setOriginalData] = useState(null) // 原始数据
    const createItem = useCallback((Component, params) => (<Component {...defaultProps} {...params} form={form} />), [form])
    const createFormItems = useCallback(() => searchFiled.map(v => (
        <div key={v.filed} className={classNames('third', 'i_b', v.className)}>
            {createItem(formComponents[v.type], v)}
        </div>
    )), [searchFiled, createItem])
    const [pageParams, setPageParams] = useState({ pageSize:20, current: 1 })
    const [paginationData, setPaginationData] = useState({ pageSize:20, current: 1, total: 0 })
    const onSearch = useCallback((value) => {
        form && form.validateFields().then(res => {
            const searchParams = beforeSearch ? beforeSearch({...pageParams, ...res, ...getUrlParams(search), ...value}) : {...pageParams, ...res, ...getUrlParams(search), ...value}
            if (searchParams && searchMethod){
                setLoading && setLoading(true)
                searchMethod(searchParams).then(res => {
                    setLoading && setLoading(false)
                    if (res.status !== '0') return errorTip(res.message)
                    setOriginalData(res?.data)
                    const {pageList, pageSize, current, total} = beforeShowData ? beforeShowData(res.data) : res.data
                    setPaginationData({pageSize, current, total})
                    setData(pageList)
                })
            }
            //发送请求
        }).catch(() => {})
    }, [form, beforeSearch, pageParams, search, searchMethod, setLoading, beforeShowData])
    const handleColumns = useMemo(() => columns.map(v => {
        const tem = {...v}
        tem.render = v.render ? (text, record, index) => v.render(text, record, index, {setLoading, onSearch}) : text => <div>{text}</div>
        return tem
    }), [columns, onSearch, setLoading])

    useEffect(() => {
        const { setFieldsValue } = form
        setFieldsValue(getUrlParams(search))
    }, [search, form])

    useEffect(() => {
        onSearch()
    }, [onSearch, pageParams])

    const onReset = () => {
        form.resetFields()
    }
    const onChangePagination = (page, pageSize) => {
        setPageParams({pageSize:pageSize, current: page})
    }
    return (
        <Form form={form}>
            {searchFiled && searchFiled.length > 0 && (
                <div className={classNames('card', style.formContentBox)}>
                    {createFormItems(searchFiled)}
                    <div className={classNames(style.formHandleBtn)}>
                        <Item>
                            <Button type="primary" htmlType="submit" onClick={() => onSearch()}>
                                搜索
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                重置
                            </Button>
                        </Item>
                    </div>
                </div>
            )}
            <div className={classNames('card')}>
                <div className={classNames(style.handleBox)}>
                    <TableHandleBtns handleBtns={handleBtns} onSearch={onSearch} {...{history, searchFiled, setSearchFiled, form, originalData}} />
                </div>
                <BasicTable {...{form, columns: handleColumns, data, tableParams, setLoading, paginationData, onChangePagination}} onSearch={onSearch} />
            </div>

        </Form>
    )
}
export default React.memo(FormSearch)