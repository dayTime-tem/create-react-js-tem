import { get, post, download } from './tools';
import { setUrlParams } from "@/utils"
const REQUEST_URL = 'http://122.9.44.39/api'
/**
 * login 登录
 * logout 登出
 * changePassword 修改密码
 * */
export const login = params => post(REQUEST_URL + '/user/login/', params)
export const logout = ({id}) => post(REQUEST_URL + '/user/logout/', {id})
export const changePassword = params => post(REQUEST_URL + '/user/change/', params)

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
export const getFirmInfo = ({id}) => post(REQUEST_URL + `/enterprise/`, {id})
//修改企业信息
export const editFirmInfo = (id, params) => post(REQUEST_URL + `/enterprise/update/${id}/`, params)
//下载企业信息
export const downloadFirmList = (data) => download({url: REQUEST_URL + `/enterprise/export/`, data})
//删除企业信息
export const deleteFirm = params => post(REQUEST_URL + '/enterprise/delete/', params)
/**
* 指标排行榜
* */
//列表查询
export const trackList = params => get(REQUEST_URL + '/enterprise/track/', params)
//下载企业排名
export const downloadFirmRank = (data) => download({url: REQUEST_URL + '/enterprise/track_export/', data})
/**
 * 基础管理
 * */
//列表查询
export const baseList = params => {
    const { current, pageSize } = params
    delete params['current']
    delete params['pageSize']
    return post(REQUEST_URL + `/user/find/${setUrlParams({ pageSize, current })}`, params)
}
//添加账号
export const addUser = (id, params) => post(REQUEST_URL + '/user/add/', params)
//删除账号
export const deleteUser = params => get(REQUEST_URL + '/user/delete/', params)
//账号详情
export const detailsUser = params => get(REQUEST_URL + '/user/detail/', params)
//修改账号
export const updateUser = (id, params) => post(REQUEST_URL + `/user/update/`, {user_id: id, ...params})
//重置密码
export const resetPassword = params => post(REQUEST_URL + `/user/reset/`, params)
