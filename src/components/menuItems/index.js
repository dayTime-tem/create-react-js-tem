/**
 * @Author: dayTimeAffect
 * @Date: 2021/8/3
 */
import React, {useCallback, useEffect, useState} from "react";
import { Menu } from 'antd';
import routes  from '@/routes/config'
import { AppstoreOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import {permissionFilter} from "@/utils";

const { Item, SubMenu } = Menu
const menus = routes['menus']
const mode = routes.mode
const recombineOpenKeys = (openKeys) => {
    let res = []
    let tem = ''
    for (let i = 0; i < openKeys.length; i ++){
        tem += openKeys[i]
        res.push(tem)
    }
    return res
}
const MenuItems = (props) => {
    const { location, className } = props
    const [selectedKeys, setSelectedKeys] = useState([])
    const [openKeys, setOpenKeys] = useState([])
    useEffect(() => {
        if (location?.pathname){
            setOpenKeys(recombineOpenKeys(location?.pathname.match(/[/](\w+)/gi)))
            setSelectedKeys([location?.pathname])
        }
    }, [location?.pathname])
    const createItem = useCallback((v) => {
        return (<Item key={v.key} icon={v.icon} className={v.iconModal + '-iconModal'}><Link to={v.key + (v.query || '')}><span>{v.title}</span></Link></Item>)
    }, [])
    const createSubMenu = useCallback(config => {
        return (
            (config.subs && config.subs.length > 0 && mode !== 1)
                ? <SubMenu key={config.key} title={config.title} icon={config.icon ? config.icon : <AppstoreOutlined />}>
                    {permissionFilter(config.subs).map(v => createSubMenu(v))}</SubMenu> :
                createItem(config)
        )
    }, [createItem])
    return (
        <div className={className}>
            <Menu mode="inline" {...{selectedKeys, openKeys}} onOpenChange={keys => setOpenKeys(keys)}>
                {permissionFilter(menus).map(v => createSubMenu(v))}
            </Menu>
        </div>
    )
}
export default React.memo(MenuItems)