import { get, post, download } from './tools';
const REQUEST_URL = 'http://122.9.44.39/api'
/**
 * login 登录
 * logout 登出
 * changePassword 修改密码
 * */
export const login = params => new Promise(resolve => resolve({status: window.state.SUCCESS, data: {userName: 'admin'}}))
// export const login = params => post(REQUEST_URL + '/user/login/', params)
export const logout = ({id}) => new Promise(resolve => resolve({status: window.state.SUCCESS}))
// export const logout = ({id}) => post(REQUEST_URL + '/user/logout/', {id})
export const changePassword = new Promise(resolve => resolve({status: window.state.SUCCESS}))
// export const changePassword = params => post(REQUEST_URL + '/user/change/', params)

export const getCaptcha = () => get(REQUEST_URL + '/sys/captcha')
export const sendPhoneValidCode = params => get(REQUEST_URL + '/user/retrievePassword/sendPhoneValidCode', params)
export const checkNamePhoneAndCode = params => post(REQUEST_URL + '/user/retrievePassword/checkNamePhoneAndCode', params)
export const updatePassword = params => post(REQUEST_URL + '/user/retrievePassword/updatePassword', params)

/**
* 企业基础信息管理
* */
//列表查询
export const baseInfoFindList = () => new Promise(resolve => {resolve({status: window.state.SUCCESS, data: {pageList: [], pageSize: 20, current: 1, total: 0}})})
//创造
export const createFirm = (id, params) => new Promise(resolve => {resolve({status: window.state.SUCCESS})})
//下载
export const downloadFirmList = (data) => download({url: REQUEST_URL, data})
//删除
export const deleteFirm = params => new Promise(resolve => {resolve({status: window.state.SUCCESS})})
