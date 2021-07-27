/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/14
 */
import React, {useEffect, useState} from "react";
import {CommitList} from "../../components";
const ListPage = (props) => {
    const { location: { pathname } } = props
    const [config, setConfig] = useState()
    useEffect(() => {
        setConfig(pathname ? pathname.split('/').pop(): '')
    }, [pathname])
    return (
        <div>
            <CommitList config={config} {...props} />
        </div>
    )
}
export default ListPage