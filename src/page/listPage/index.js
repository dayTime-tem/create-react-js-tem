/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/14
 */
import React, {useEffect, useState} from "react";
import {CommitList} from "../../components";
import { getUrlParams } from "@/utils";

const ListPage = (props) => {
    const { location: { pathname, search } } = props
    const [config, setConfig] = useState()
    const [urlParams, setUrlParams] = useState({ pageSize: 20, current: 1 })
    useEffect(() => {
        setConfig(pathname ? pathname.split('/').pop(): '')
    }, [pathname])
    useEffect(() => {
        setUrlParams({...{ pageSize: 20, current: 1 }, ...getUrlParams(search)})
    }, [search])
    return (
        <div>
            <CommitList config={config} urlParams={urlParams} {...props} />
        </div>
    )
}
export default React.memo(ListPage)