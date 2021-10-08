/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/14
 */
import React, {useCallback, useEffect, useRef, useState} from "react";
import {FormSearch} from "../index";
import * as ConfigFile from "../../pageConfig"
import { Spin } from 'antd';


const CommitList = (props) => {
    const { config, urlParams } = props
    const [loading, setLoading] = useState(false)
    const [searchFiled, setSearchFiled] = useState([])
    const [formSearchProps, setFormSearchProps] = useState({})
    const [columns, setColumns] = useState([])
    const formSearch = useRef()
    useEffect(() => {
        if (!config) return;
        let { searchFiled = [], columns = [], formSearchProps = {} } = config ? ConfigFile[config] || {} : {}
        setSearchFiled(searchFiled)
        setColumns(columns)
        setFormSearchProps(formSearchProps)
    }, [config])
    const setLoad = useCallback((b) => {
        setLoading(b)
    }, [])
    return (
        <div>
            <Spin spinning={loading}>
                <FormSearch ref={formSearch} {...{searchFiled, setSearchFiled, config, urlParams}} {...formSearchProps} columns={columns} {...props} setLoading={setLoad} />
            </Spin>
        </div>
    )
}
export default React.memo(CommitList)