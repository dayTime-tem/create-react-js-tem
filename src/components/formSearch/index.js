/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/14
 */
import React, {useCallback, useEffect, useMemo, useState, useImperativeHandle} from "react";
import { Form, Button } from "antd"
import { BasicTable } from "../widget"
import style from "./index.module.less"
import classNames from "classnames";
import { TableHandleBtns } from "@/components"
import { errorTip, setUrlParams } from "@/utils";
import CreateFormItem from "./createFormItem";
import {clearObj} from "../../utils";

const { Item } = Form

const FormSearch = (props, ref) => {
    const {
        config, urlParams,
        searchFiled,
        handleBtns = [],
        columns,
        tableParams = {rowKey: 'id'},
        setLoading,
        beforeSearch,
        history,
        searchMethod,
        setSearchFiled,
        beforeShowData,
        addShow, removeShow, exportShow, exportMethod
    } = props
    const [form] = Form.useForm();
    const [data, setData] = useState([]) // table列表数据
    const [selectedRow, setSelectedRow] = useState([])
    const [originalData, setOriginalData] = useState(null) // 原始数据
    const [paginationData, setPaginationData] = useState({ pageSize:20, current: 1, total: 0 })
    const getFormValue = useCallback(() => new Promise(resolve => {
        form && form.validateFields().then(res => {
            resolve(res)
        }).catch(() => {})
    }).catch(() => {}), [form])
    const searchApi = useCallback((params, url) => {
        history.push(history.location.pathname + setUrlParams(url))
        if (!searchMethod) return;
        setLoading && setLoading(true)
        searchMethod(params).then(res => {
            setLoading && setLoading(false)
            if (res.status / 1 !== window.state.SUCCESS / 1) return errorTip(res.message || res.msg)
            setOriginalData(res?.data)
            const {pageList, pageSize, current, total} = beforeShowData ? beforeShowData(res.data) : res.data
            setPaginationData({pageSize, current, total})
            setData(pageList)
        })
    }, [searchMethod, setLoading, beforeShowData, history])
    const onSearch = useCallback((value) => {
        getFormValue().then(res => {
            let searchParams = {...urlParams, ...res, ...value}
            let cleanParams = beforeSearch ? beforeSearch(searchParams) : searchParams
            if (!cleanParams) return ;
            searchApi(clearObj(cleanParams), searchParams)
        }).catch(() => {})
    }, [urlParams, searchApi, beforeSearch, getFormValue])

    const handleColumns = useMemo(() => columns.map(v => {
        const tem = {...v}
        tem.render = v.render ? (text, record, index) => v.render(text, record, index, {setLoading, onSearch, data, setData, history}) : text => <div>{text}</div>
        return tem
    }), [columns, onSearch, setLoading, data, setData, history])

    useEffect(() => {
        const { setFieldsValue } = form
        setFieldsValue(urlParams)
    }, [form, urlParams])

    const onReset = () => {
        form.resetFields()
    }
    const onChangePagination = (page, pageSize) => {
        onSearch({pageSize:pageSize / 1, current: page / 1})
    }
    useEffect(() => {
        // componentDidMount方式
        // searchMethod && onSearch(urlParams)
        beforeSearch && onSearch(urlParams)
        if (beforeSearch){
            getFormValue().then(res => {
                let searchParams = {...res, ...urlParams}
                let cleanParams = beforeSearch ? beforeSearch(searchParams) : searchParams
                if (!cleanParams) return ;
                searchApi(clearObj(cleanParams), clearObj(searchParams))
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [beforeSearch, getFormValue])
    useImperativeHandle(ref, () => {
        return { onSearch }
    })
    return (
        <Form form={form}>
            {searchFiled && searchFiled.length > 0 && (
                <div className={classNames('card', style.formContentBox)}>
                    <CreateFormItem {...{form, searchFiled}} />
                    <div className={classNames(style.formHandleBtn)}>
                        <Item>
                            <Button type="primary" htmlType="submit" onClick={() => onSearch({current: 1})}>
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
                    <TableHandleBtns handleBtns={handleBtns} onSearch={onSearch} {...{data, history, searchFiled, setSearchFiled, form, originalData,
                        addShow, removeShow, config, selectedRow, setLoading, exportShow, exportMethod}} />
                </div>
                <BasicTable {...{form, columns: handleColumns, data, tableParams, setLoading, paginationData, onChangePagination, selectedRow, setSelectedRow}} onSearch={onSearch} />
            </div>

        </Form>
    )
}
export default React.memo(React.forwardRef(FormSearch))