import { get, post } from './tools';
import { sleep } from "@/utils"
const REQUEST_URL = 'https://coverpolitics-api-idc-test.hljtv.com'
/**
 * login 登录
 * logout 登出
 * changePassword 修改密码
 * */
// export const login = params => get(REQUEST_URL + '/login', params)
// export const logout = () => get(REQUEST_URL + '/logout')
// export const changePassword = params => post(REQUEST_URL + '/changePassword', params)
export const login = () => sleep(1000).then(res => ({status: '200'}))
export const logout = () => sleep(1000).then(res => ({status: '200'}))
export const changePassword = () => sleep(1000).then(res => ({status: '200'}))


export const getCaptcha = () => get(REQUEST_URL + '/sys/captcha')
export const sendPhoneValidCode = params => get(REQUEST_URL + '/user/retrievePassword/sendPhoneValidCode', params)
export const checkNamePhoneAndCode = params => post(REQUEST_URL + '/user/retrievePassword/checkNamePhoneAndCode', params)
export const updatePassword = params => post(REQUEST_URL + '/user/retrievePassword/updatePassword', params)

export const getPoliticalList = params => get(REQUEST_URL + '/political/list', params)
export const saveReply = params => post(REQUEST_URL + '/political/reply/saveReply', params)

