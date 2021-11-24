/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/26
 */
import {addUser, detailsUser, updateUser} from "../../service";

const power = [
    {id: "can_read", name: '查看'},
    {id: "can_add", name: '新增'},
    {id: "can_delete", name: '删除'},
    {id: "is_admin", name: '超级管理员'},
]

const validator = (value, callBack) => {
    let regex =/^[\u4E00-\u9FA5a-zA-Z0-9]*$/
    if (!regex.test(value)){
        return callBack('用户名仅支持汉字、英文字符和数字,不支持符号')
    } 
    return callBack()
}
export const editFiled = [
    {
        title: '账号信息',
        filed: [
            {type: 'input', filed: 'username', name: '用户名', className: 'whole',maxLen:20, validator, required: true,wrapperCol: {span: 6}, minLen: 2},
        ]
    },
    {
        title: '权限',
        filed: [
            {type: 'checkRange', filed: 'profile', name: '权限', required: true, options: power, className: 'whole', initialValue: ["can_read"]},
        ]
    },
]
export const editProps = {
    beforeEdited: values => {
        let profile = {can_read: false, can_add: false, can_delete: false, is_admin: false,}
        values.profile?.options?.forEach(v => profile[v] = true)
        delete values.profile
        return {...profile, ...values}
    },
    beforeSearch: values => {
        const { id } = values
        return {user_id: id}
    },
    beforeShowData: (values, {type}) => {
        if (type === "edit"){
            values['profile'] = {options: Object.entries(values.profile).filter(v => v[1]).map(v => v[0])}
        }

        return values
    },
    name: '账号',
    addMethod: addUser,
    searchMethod: detailsUser,
    saveMethod: updateUser,
}