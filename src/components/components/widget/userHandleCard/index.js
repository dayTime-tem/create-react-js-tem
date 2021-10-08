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
        logout().then(res => {
            setLoad(false)
            if (res.status === '1') return errorTip(res.message)
            successTip("操作成功")
            clearLoginInfo()
        })
    }
    return (
        <Popover title={(
            <div className={style.userName}>
                登录用户：{registerInfo?.userName}
            </div>
        )} content={(
            <div>
                <ul className={style.handle}>
                    <li className={classNames(style.txt)}>欢迎使用 在线问政回复后台</li>
                    <li>
                        <ChangePwdModal {...props} />

                        <span className={classNames(style.logoutBtn, style.btn)} onClick={logoutBtn}>安全退出</span>

                    </li>
                </ul>
                
            </div>
        )} placement="bottomRight" trigger="click">
            <Avatar size={36} src="https://wapcdn.thecover.cn/nest/images/avatar.png" />
        </Popover>
    )
}
export default UserHandleCard