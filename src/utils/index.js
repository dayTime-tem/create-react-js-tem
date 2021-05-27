export const getUrlParams = (search, name) => {
    if (!search) return null
    let params = search.split('?')[1].split('&')
    let res = {}
    params.forEach(v => {
        const [key, val] = v.split('=')
        res[key] = val
    })
    return name ? res[name] : res
}
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

