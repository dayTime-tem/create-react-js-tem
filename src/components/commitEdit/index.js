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
import {CustomIcon} from "../widget";
import add from "@/img/icon-3.png"
import detail from "@/img/icon-4.png"
import edit from "@/img/icon-5.png"
import { RollbackOutlined, CheckOutlined } from "@ant-design/icons"


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
                    {type === 'add' && <div className={style.title}><CustomIcon icon={add} /><span>添加{editProps.name}</span></div>}
                    {type === 'edit' && <div className={style.title}><CustomIcon icon={edit} /><span>修改{editProps.name}</span></div>}
                    {type === 'info' && <div className={style.title}><CustomIcon icon={detail} /><span>{editProps.name}详情</span></div>}
                    <FormEdit ref={form} {...{config, type, editFiled, editProps, id}} {...editProps} {...props} setLoading={setLoad} />
                </div>
                <div className={classNames(style.btnsBox)}>
                    <Button className={classNames('handleBtn')} onClick={() => history.go(-1)} danger ghost><RollbackOutlined />关闭</Button>
                    {   type !== 'info' && (
                        <AuthPermission permission={editProps.savePermission}><Button type="primary" className={classNames('handleBtn')} style={{marginLeft: 12}} onClick={save}><CheckOutlined />保存</Button></AuthPermission>
                    )}
                </div>
            </Spin>
        </div>
    )
}
export default React.memo(CommitEdit)