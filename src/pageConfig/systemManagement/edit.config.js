/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/26
 */
const power = [
    {id: 0, name: '查看'},
    {id: 1, name: '新增'},
    {id: 2, name: '删除'},
    {id: 3, name: '超级管理员'},
]

const validator = (value, callBack) => {
    let regex =/^[\u4E00-\u9FA5a-zA-Z]*$/
    if (!regex.test(value)){
        return callBack('仅支持汉字和英文字符,不支持符号和数字')
    } 
    return callBack()
}
export const editFiled = [
    {
        title: '账号信息',
        filed: [
            {type: 'input', filed: 'useName', name: '用户名', className: 'whole',maxLen:10, validator, required: true,wrapperCol: {span: 6}},
        ]
    },
    {
        title: '权限',
        filed: [
            {type: 'check', filed: 'power', name: '权限(多选)', required: true, options: power, className: 'whole'},
        ]
    },
]
export const editProps = {
    beforeEdited: values => {
        return values
    },
    name: '账号'
}