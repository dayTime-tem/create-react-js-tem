/**
 * @Author: dayTimeAffect
 * @Date: 2021/11/22
 */
import { logout as logoutFun} from "@/service"
import {successTip,errorTip, clearLoginInfo, confirm} from "@/utils";

export const logout = (setLoad) => {
    confirm({
        title: "确认退出？",
        onOk: (close) => {
            close()
            const registerInfo = JSON.parse(window.localStorage.getItem('registerInfo') || "{}")
            setLoad && setLoad(true)
            logoutFun(registerInfo).then(res => {
                setLoad && setLoad(false)
                if (res.status !== window.state.SUCCESS) return errorTip(res.message)
                successTip("操作成功")
                clearLoginInfo()
            })
        }
    })
}
export const permissionFilter = (arr = []) => {
    const permissionGroup = JSON.parse(window.localStorage.getItem('permissionGroup') || "[]" )
    return arr.filter(v => !v.permission || (permissionGroup.includes('allPermission') || permissionGroup.includes(v.permission)))
}