import { notification, Modal, Tooltip } from "antd"
import { ExclamationCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons"

export const getType = (param) => Object.prototype.toString.call(param).split(' ')[1].split(']')[0].toLowerCase()

export const clearObj = (obj) => {
    let tem = {}
    Object.entries(obj).forEach(([key, value]) => {
        if (getType(value) === 'undefined') return;
        if (getType(value) === 'null') return;
        if (getType(value) === 'array' && value.length === 0) return;
        if (getType(value) === 'object'){
            let child = clearObj(value)
            if (child) tem[key] = child
        }else{
            tem[key] = value
        }
    })
    return Object.keys(tem).length === 0 ? undefined : tem
}

/**
 * search: String
 * name: String
 * return Object | undefined
 */
export const getUrlParams = (search, name) => {
    if (!search) return name ? undefined : {}
    let params = search.split('?')[1].split('&')
    let res = {}
    params.forEach(v => {
        const [key, val] = v.split('=')
        res[decodeURIComponent(key)] = JSON.parse(decodeURIComponent(val))
    })
    return name ? res[name] : res
}

/**
 * query: Object
 * return String
 */
export const setUrlParams = (query) => {
    let url = '?'
    let queryArr = []
    for (let key in query){
        if (query.hasOwnProperty(key)){
            if (query[key] === undefined) continue;
            queryArr.push(`${key}=${encodeURIComponent(JSON.stringify(query[key]))}`)
        }
    }
    return url + queryArr.join('&')
}

/**
 * time: 时间戳
 */
export const dateFormat = (time, format) => {
    const t = new Date(time)
    format = format || 'Y-m-d h:i:s'
    let year = t.getFullYear()
    let month = t.getMonth() + 1
    let day = t.getDate()
    let hours = t.getHours()
    let minutes = t.getMinutes()
    let seconds = t.getSeconds()
    const hash = {
        'y': year,
        'm': month,
        'd': day,
        'h': hours,
        'i': minutes,
        's': seconds
    }
    const isAddZero = (o) => {
        return /M|D|H|I|S/.test(o)
    }
    return format.replace(/\w/g, o => {
        let rt = hash[o.toLocaleLowerCase()]
        return rt >= 10 || !isAddZero(o) ? rt : `0${rt}`
    })
}

/**
 * value: String
 */
export const validationEmail = (value) => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)

/**
 * value: String
 */
export const validationPhone = (value) => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)

/**
 * value: String
 */
export const validationNumber = (value) => !/[^0-9|.]/.test(value)
export const formValidationNumber = (value, callBack) => {
    if (!validationNumber(value)) return callBack('只能输入数字')
    return callBack()
}

/**
 * value: any
 * return Promise
 */
export const validatorCallBack = (value) => new Promise((resolve, reject) => {
    if (value) reject(value)
    else resolve()
})

/**
 * time: number
 * return Promise
 */
export const sleep = (time) => new Promise(resolve => setTimeout(() => {resolve(time)}, time))

/**
 * 修改searchFiled某个控件的Props 返回一个新的searchFiled
 * */
export const setFiledProps = (FiledArr, targetFiled,nextProps) => {
    return FiledArr.map(v => {
        if (v.filed === targetFiled) return {...v, ...nextProps}
        return {...v}
    })
}

/**
 * msg: String | ReactNode
 * title?: String | ReactNode
 * */
export const errorTip = (msg, title = '错误') => {
    return notification['error']({ message: title, description: msg });
}
export const successTip = (msg, title = '成功') => {
    return notification['success']({ message: title, description: msg || "操作成功" });
}

/**
 * title: String | ReactNode
 * content: String | ReactNode
 * okText?: String | ReactNode
 * cancelText?: String | ReactNode
 * onOk?: Promise | Function
 * onCancel?: Promise | Function
 * */
export const confirm = ({title, content, onOk, onCancel, okText = '确认', cancelText = '取消'}) => {
    const { confirm } = Modal
    return confirm({
        icon: <ExclamationCircleOutlined />,
        title, content, okText, cancelText,
        onOk(close) {
           return onOk ? onOk(close) : close()
        },
        onCancel(close) {
            return onCancel ? onCancel(close) : close()
        },
    })
}


export const md5 = (str) => require('md5')(str).toLocaleUpperCase()
export const clearLoginInfo = () => {
    window.localStorage.setItem('registerInfo', '')
    return window.location.hash = '#/login'
}
export const initialValueCallBack = ({initialVal, type = 'text', props}) => {
    let val =
        initialVal ?
            typeof initialVal === 'function' ?
                initialVal(props) : initialVal
            : undefined
    switch (type) {
        case "text":
            return val
        default:
            return val
    }
}
export const tipQuestion = (tip) => <Tooltip title={tip}><QuestionCircleOutlined style={{color: '#9f9f9f'}} /></Tooltip>


