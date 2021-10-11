import { get, post } from './tools';
import { sleep, setUrlParams } from "@/utils"
const REQUEST_URL = 'http://122.9.44.39:8000'
/**
 * login 登录
 * logout 登出
 * changePassword 修改密码
 * */
// export const login = params => get(REQUEST_URL + '/login', params)
// export const logout = () => get(REQUEST_URL + '/logout')
// export const changePassword = params => post(REQUEST_URL + '/changePassword', params)
export const login = () => sleep(1000).then(res => ({status: 200}))
export const logout = () => sleep(1000).then(res => ({status: 200}))
export const changePassword = () => sleep(1000).then(res => ({status: 300}))


export const getCaptcha = () => get(REQUEST_URL + '/sys/captcha')
export const sendPhoneValidCode = params => get(REQUEST_URL + '/user/retrievePassword/sendPhoneValidCode', params)
export const checkNamePhoneAndCode = params => post(REQUEST_URL + '/user/retrievePassword/checkNamePhoneAndCode', params)
export const updatePassword = params => post(REQUEST_URL + '/user/retrievePassword/updatePassword', params)

/**
* 企业基础信息管理
* */
//列表查询
export const baseInfoFindList = params => {
    const { current, pageSize } = params
    delete params['current']
    delete params['pageSize']
    return post(REQUEST_URL + `/enterprise/find/${setUrlParams({ pageSize, current })}`, params)
}
//创造企业
export const createFirm = (id, params) => post(REQUEST_URL + `/enterprise/create/`, params)
//查询企业详情
export const getFirmInfo = ({id}) => get(REQUEST_URL + `/enterprise/${id}/`)
//修改企业信息
export const editFirmInfo = (id, params) => post(REQUEST_URL + `/enterprise/update/${id}/`, params)
/**
* 指标排行榜
* */
//列表查询
export const trackList = params => get(REQUEST_URL + '/enterprise/track/', params)
