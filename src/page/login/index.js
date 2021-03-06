/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/15
 */
import React, {useEffect, useRef, useState} from "react";
import style from './index.module.less'
import { FormEdit } from '@/components'
import classNames from "classnames";
// import FindPassWordModal from "@/components/widget/findPassWordModal";
import { login as loginApi } from "@/service";
import { errorTip, md5 } from "@/utils";
import { Spin } from "antd"

const editFiled = [
    {
        filed: [
            {type: 'input', filed: 'userName', name: '用户名', className: 'whole', required: true},
            {type: 'input', filed: 'password', name: '密码', className: 'whole', required: true, inputType: 'password'},
        ]
    }
]

const Login = (props) => {
    const { history } = props
    const registerInfo = window.localStorage.getItem('registerInfo')
    const goRoute = window.localStorage.getItem('goRoute')
    const form = useRef()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (registerInfo){
            history.replace(goRoute ? goRoute : '/app/baseInfoManagement')
        }
    }, [history, registerInfo, goRoute])

    const login = () => {
        const { getForm } = form.current
        getForm().validateFields().then(res =>{
            setLoading(true)
            const { userName, password } = res
            loginApi({username: userName, checkKey: window.checkKey, password: md5(password)}).then((res = {}) => {
                setLoading(false)
                const { status, message, data, msg } = res
                if (status !== window.state.SUCCESS) {
                    form.current?.getForm().setFieldsValue({
                        password: ''
                    })
                    return errorTip(message || msg)
                }
                const { username, userName, id, auth = ["is_admin"] } = data
                window.localStorage.setItem('registerInfo', JSON.stringify({
                    userName: username || userName,
                    id
                }))
                let permission = [...auth]
                if (data['is_admin']) permission.push("allPermission")
                //模拟
                permission.push('allPermission')
                window.localStorage.setItem('permissionGroup', JSON.stringify(permission))
                history.push(goRoute ? goRoute : window.defaultGo)
            })
        }).catch(res => {})
    }
    return (
        <div className={style.loginBg}>
            <div className={style.mainLogin}>
                <Spin spinning={loading}>
                    <div className={style.mainLoginContent}>
                        {/*<img src="https://wapcdn.hljtv.com/cdn/nest/images/login-logo.1ffGvlq.png" alt="logo"/>*/}
                        <div style={{fontSize: 24, fontWeight: 600, textAlign:'center', marginBottom: 24}}>四川省网信企业数据库</div>
                        <div>
                            <FormEdit ref={form} editFiled={editFiled} />
                            <div className={classNames('whole', style.loginBtn)} onClick={login}>登录</div>
                            {/*<FindPassWordModal><div className={classNames('whole', style.getBackPas)}>找回密码</div></FindPassWordModal>*/}
                        </div>
                    </div>
                </Spin>
            </div>
        </div>
    )
}
export default Login