/**
 * @Author: dayTimeAffect
 * @Date: 2021/11/20
 */
import React from "react";
import style from "./index.module.less"
import classNames from "classnames";
import userHead from "@/img/userHead.png"
import { Button } from "antd";
import ChangePwdModal from "@/components/widget/userHandleCard/ChangePwdModal";
import {logout} from "@/utils";
import { MenuItems } from "@/components"

const SliderMainMenu = function (props){
    const { systemNameImg, registerInfo, setLoad } = props
    return (
        <div className={classNames(style.main)}>
            <div className={classNames(style.systemName)}>{ systemNameImg ? <img src={systemNameImg} alt={window.systemName} /> : window.systemName }</div>
            <div className={classNames(style.userCard)}>
                <img src={userHead} alt="用户头像"/>
                <div className={classNames(style.userName)}>{registerInfo?.userName}</div>
                <div className={classNames(style.handle)}>
                    <ChangePwdModal width={600}><Button className={classNames('dark_bg_simple_btn handleBtn')}>修改密码</Button></ChangePwdModal>
                    <Button onClick={() => logout(setLoad)} className={classNames('dark_bg_simple_btn handleBtn')}>安全退出</Button>
                </div>
            </div>
            <MenuItems className={classNames(style.menu)} {...{setLoad}} {...props} />
        </div>
    )
}
export default SliderMainMenu