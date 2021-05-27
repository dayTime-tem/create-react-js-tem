import axios from "axios";

export const get = (url, config, msg = '接口异常') =>
    axios
        .get(url, config)
        .then(res => res.data)
        .catch(err => window.alert(msg))

export const post = (url, data, config, msg = '接口异常') =>
    axios
        .post(url, data, config)
        .then(res => res.data)
        .catch(err => window.alert(msg))