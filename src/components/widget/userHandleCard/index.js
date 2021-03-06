/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/14
 */
import React from "react";
import {Avatar, Popover} from 'antd';
import style from './index.module.less'
import classNames from "classnames";
import ChangePwdModal from "./ChangePwdModal"
import {successTip,errorTip, clearLoginInfo} from "@/utils";
import { logout } from "@/service"

const UserHandleCard = function (props){
    const { setLoad } = props
    const registerInfo = JSON.parse(window.localStorage.getItem('registerInfo') || "{}")
    const logoutBtn = () => {
        setLoad(true)
        logout(registerInfo).then(res => {
            setLoad(false)
            if (res.status !== window.state.SUCCESS) return errorTip(res.message)
            successTip("操作成功")
            clearLoginInfo()
        })
    }
    return (
        <Popover title={(
            <div className={style.title}>
                欢迎使用 {window.systemName}
            </div>
        )} content={(
            <div>
                <ul className={style.handle}>
                    <li className={classNames(style.txt)}>用户名：{registerInfo?.userName}</li>
                    <li  className={style.handleBtn}>
                        <ChangePwdModal {...props} />

                        <span className={classNames(style.logoutBtn, style.btn)} onClick={logoutBtn}>安全退出</span>

                    </li>
                </ul>

            </div>
        )} placement="bottomRight" trigger="click">
            <span className={style.userName}>{registerInfo?.userName}</span>
            <Avatar size={36} src="https://wapcdn.thecover.cn/nest/images/avatar.png" />
        </Popover>
    )
}
export default UserHandleCard