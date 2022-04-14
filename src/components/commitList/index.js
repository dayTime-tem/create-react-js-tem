/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/14
 */
import React, {useCallback, useEffect, useRef, useState} from "react";
import {FormSearch} from "../index";
import * as ConfigFile from "../../pageConfig"
import { Button, Spin } from 'antd';
import classNames from "classnames";
import style from "../commitList/index.module.less";
import {RollbackOutlined} from "@ant-design/icons";

const CommitList = (props) => {
    const { config, urlParams } = props
    const [loading, setLoading] = useState(false)
    const [searchFiled, setSearchFiled] = useState([])
    const [formSearchProps, setFormSearchProps] = useState({})
    const [columns, setColumns] = useState([])
    const formSearch = useRef()
    useEffect(() => {
        if (!config) return;
        let { listSearchConfig = {} } = config ? ConfigFile[config] || {} : {}
        setSearchFiled(listSearchConfig.searchFiled || [])
        setColumns(listSearchConfig.columns || [])
        setFormSearchProps(listSearchConfig)
    }, [config])
    const setLoad = useCallback((b) => {
        setLoading(b)
    }, [])
    return (
        <div>
            <Spin spinning={loading}>
                <FormSearch ref={formSearch} {...{searchFiled, setSearchFiled, config, urlParams}} {...formSearchProps} columns={columns} {...props} setLoading={setLoad} />
                <div className={classNames(style.btnsBox)}>
                    { formSearchProps.isBack && <Button className={classNames('handleBtn')} onClick={() => history.go(-1)} danger ghost><RollbackOutlined />返回</Button>}
                </div>
            </Spin>
        </div>
    )
}
export default React.memo(CommitList)