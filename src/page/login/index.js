/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/15
 */
import React, {useEffect, useRef, useState} from "react";
import style from './index.module.less'
import { FormEdit } from '@/components'
import classNames from "classnames";
import FindPassWordModal from "@/components/widget/findPassWordModal";
import { getCaptcha, login as loginApi } from "@/service";
import { errorTip, md5 } from "@/utils";
import { Spin } from "antd"

const editFiled = [
    {type: 'input', filed: 'userName', name: '用户名', className: 'whole', required: true},
    {type: 'input', filed: 'password', name: '密码', className: 'whole', required: true, inputType: 'password'},
    /*{type: 'graphValidate', filed: 'captcha', name: '验证码', className: 'whole', required: true
        , getCaptcha
        , getCallBack: (res) => {
            const { key } = res?.data
            window.checkKey = key
        }},*/
]

const Login = (props) => {
    const { history } = props
    const registerInfo = window.sessionStorage.getItem('registerInfo')
    const goRoute = window.sessionStorage.getItem('goRoute')
    const form = useRef()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (registerInfo){
            history.replace(goRoute ? goRoute : '/app/mainPage/replyList?replyStatus=-1')
        }
    }, [history, registerInfo, goRoute])

    const login = () => {
        const { getForm } = form.current
        getForm().validateFields().then(res =>{
            setLoading(true)
            const { userName, password, captcha } = res
            loginApi({userName, captcha, checkKey: window.checkKey, password: md5(password)}).then(res => {
                setLoading(false)
                const { status, message } = res
                if (status !== window.state.SUCCESS) return errorTip(message)
                window.sessionStorage.setItem('registerInfo', JSON.stringify({
                    userName: userName
                }))
                history.replace(goRoute ? goRoute : '/app/mainPage/replyList')
            })
        }).catch(res => {})
    }

    return (
        <div className={style.loginBg}>
            <div className={style.mainLogin}>
                <Spin spinning={loading}>
                    <div className={style.mainLoginContent}>
                        <img src="https://wapcdn.hljtv.com/cdn/nest/images/login-logo.1ffGvlq.png" alt="logo"/>
                        <div>
                            <FormEdit ref={form} editFiled={editFiled} />
                            <div className={classNames('whole', style.loginBtn)} onClick={login}>登录</div>
                            <FindPassWordModal><div className={classNames('whole', style.getBackPas)}>找回密码</div></FindPassWordModal>
                        </div>
                    </div>
                </Spin>
            </div>
        </div>
    )
}
export default Login