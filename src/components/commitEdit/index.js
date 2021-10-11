/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/26
 */
import React, {useCallback, useEffect, useRef, useState} from "react";
import {FormEdit} from "../index";
import * as ConfigFile from "../../pageConfig"
import { Spin, Button } from 'antd';
import classNames from "classnames";
import style from "./index.module.less"
import {errorTip} from "@/utils";
import {successTip} from "../../utils";
import {AuthPermission} from "@/components";

const CommitEdit = (props) => {
    const { config, type, history, id } = props
    const [loading, setLoading] = useState(false)
    const [editFiled, setEditFiled] = useState([])
    const [editProps, setEditProps] = useState([])
    const form = useRef()
    useEffect(() => {
        if (!config) return;
        let { editFiled, editProps = {} } = config ? ConfigFile[config]?.editConfig || {} : {}
        setEditFiled((editFiled || []).map(v => ({...v, filed: v.filed?.map(v => ({...v, details: type === 'info'}))})))
        setEditProps(editProps)
    }, [config, type])
    const setLoad = useCallback((b) => {
        setLoading(b)
    }, [])
    const save = () => {
        const { submit } = form.current
        const { addMethod, saveMethod, editCallBack } = editProps
        submit().then(res => {
            setLoad(true)
            const api = type === "add" ? addMethod : saveMethod
            if (!api) return;
            api(id, res).then(res => {
                setLoad(false)
                if (res.status !== window.state.SUCCESS) return errorTip(res.message || res.msg)
                successTip(res.message || res.msg)
                if (editCallBack) return editCallBack({history, config, type})
                if (type === "add") return history.replace(history.location.pathname.split("/add")[0])
                history.go(-1)
            })
        })
    }
    return (
        <div>
            <Spin spinning={loading}>
                <div className={classNames('card', style.minHeight)}>
                    {type === 'add' && <div className={style.title}>添加{editProps.name}</div>}
                    {type === 'edit' && <div className={style.title}>修改{editProps.name}</div>}
                    {type === 'info' && <div className={style.title}>{editProps.name}详情</div>}
                    <FormEdit ref={form} {...{config, type, editFiled, editProps, id}} {...editProps} {...props} setLoading={setLoad} />
                </div>
                <div className={classNames(style.btnsBox)}>
                    <Button onClick={() => history.go(-1)} danger ghost>关闭</Button>
                    {   type !== 'info' && (
                        <AuthPermission permission={editProps.savePermission}><Button type="primary" size='large' style={{marginLeft: 12}} onClick={save}>保存</Button></AuthPermission>
                    )}
                </div>
            </Spin>
        </div>
    )
}
export default React.memo(CommitEdit)