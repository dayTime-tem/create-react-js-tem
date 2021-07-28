/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/14
 */
import React, {useCallback, useEffect, useMemo, useState} from "react";
import { Form, Button } from "antd"
import { BasicTable } from "../widget"
import style from "./index.module.less"
import classNames from "classnames";
import { TableHandleBtns } from "@/components"
import { getUrlParams, errorTip } from "@/utils";
import CreateFormItem from "./createFormItem";

const { Item } = Form

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
        beforeShowData,
    } = props
    const [form] = Form.useForm();
    const [data, setData] = useState([]) // table列表数据
    const [originalData, setOriginalData] = useState(null) // 原始数据
    const [pageParams, setPageParams] = useState({ pageSize:20, current: 1 })
    const [paginationData, setPaginationData] = useState({ pageSize:20, current: 1, total: 0 })
    const [componentStatus, setComponentStatus] = useState(0) // 组件状态：1-loading中，0-复位
    const onSearch = useCallback((value) => {
        form && form.validateFields().then(res => {
            const searchParams = beforeSearch ? beforeSearch({...pageParams, ...res, ...getUrlParams(search), ...value}) : {...pageParams, ...res, ...getUrlParams(search), ...value}
            if (searchParams && searchMethod){
                setComponentStatus(1)
                setLoading && setLoading(true)
                searchMethod(searchParams).then(res => {
                    setComponentStatus(0)
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
        tem.render = v.render ? (text, record, index) => v.render(text, record, index, {setLoading, onSearch, data, setData}) : text => <div>{text}</div>
        return tem
    }), [columns, onSearch, setLoading, data, setData])

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
                    <CreateFormItem {...{form, searchFiled}} />
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
                    <TableHandleBtns handleBtns={handleBtns} onSearch={onSearch} {...{history, searchFiled, setSearchFiled, form, originalData, componentStatus}} />
                </div>
                <BasicTable {...{form, columns: handleColumns, data, tableParams, setLoading, paginationData, onChangePagination}} onSearch={onSearch} />
            </div>

        </Form>
    )
}
export default React.memo(FormSearch)