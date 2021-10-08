/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/26
 */
import React, {useEffect, useState} from "react";
import {CommitEdit} from "../../components";
const EditPage = (props) => {
    const { location: { pathname }, match: { params: { id } } } = props
    const [config, setConfig] = useState('')
    const [type, setType] = useState('')
    useEffect(() => {
        const parseUrl = pathname.split('/').reverse()
        setConfig(parseUrl[1 + (id?.length > 0)])
        setType(parseUrl[0 + (id?.length > 0)])
    }, [pathname, id])
    return (
        <div>
            <CommitEdit {...{type, config, id}} {...props} />
        </div>
    )
}
export default EditPage