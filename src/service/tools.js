import axios from "axios";
import { errorTip, clearLoginInfo } from "@/utils";
axios.defaults.withCredentials = true; //允许携带cookie
export const get = (url, params, config, msg = '接口异常') =>
    axios
        .get(url, {
            params,
            ...config
        })
        .then(res => LogOnToCheck(res.data))
        .catch(err => errorTip(msg))

export const post = (url, data, config, msg = '接口异常') =>
    axios
        .post(url, data, config)
        .then(res => LogOnToCheck(res.data))
        .catch(err => errorTip(msg))

const LogOnToCheck = (data) => {
    const { status } = data
    if (status === window.state.AUTH_ERO) {
        clearLoginInfo()
    }
    return data
}