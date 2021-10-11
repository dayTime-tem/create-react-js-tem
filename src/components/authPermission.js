/**
 * @Author: dayTimeAffect
 * @Date: 2021/10/8
 */
import React from "react";
const AuthPermission = (props) => {
    const { permission, children } = props
    const permissionGroup = JSON.parse(window.localStorage.getItem('permissionGroup') || "[]" )
    return <>{!permission || (permissionGroup.includes('allPermission') || permissionGroup.includes(permission)) ? children : null}</>
}
export default React.memo(AuthPermission)