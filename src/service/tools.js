import axios from "axios";
import { errorTip, clearLoginInfo } from "@/utils";
axios.defaults.withCredentials = true; //允许携带cookie
export const get = (url, params, config, msg = '接口异常') =>
    axios
        .get(url, {
            params,
            ...config
        })
        .then(res => LogOnToCheck(res?.data))
        .catch(err => errorTip(msg))

export const post = (url, data, config, msg = '接口异常') =>
    axios
        .post(url, data, config)
        .then(res => LogOnToCheck(res.data))
        .catch(err => errorTip(msg))

export const download = ({url, method, fileName = "文件", extension = "xlsx", data, params}, msg = '接口异常') =>
    axios({
        method: method || "post",
        url,
        responseType: 'blob'
        , data, params
    }).then(res => {
        const { headers, data } = res
        let name = fileName + "." +extension
        if (headers["content-disposition"] && headers["content-disposition"].includes("filename")){
            name = headers["content-disposition"].split("filename=")[1].split(";")[0].replace(/"/g, "")
        }
        let url = window.URL.createObjectURL(new Blob([res.data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.download = name
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href)
        document.body.removeChild(link);
    }).catch(err => errorTip(msg))

const LogOnToCheck = (data) => {
    const { status, code } = data
    data['status'] = code || status
    if (data['status'] === window.state.AUTH_ERO) {
        clearLoginInfo()
    }
    return data
}