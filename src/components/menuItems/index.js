/**
 * @Author: dayTimeAffect
 * @Date: 2021/8/3
 */
import React, {useCallback, useEffect, useState} from "react";
import { Menu } from 'antd';
import routes  from '@/routes/config'
import { AppstoreOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';

const { Item, SubMenu } = Menu
const menus = routes['menus']
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
    const { location } = props
    const [selectedKeys, setSelectedKeys] = useState([])
    const [openKeys, setOpenKeys] = useState([])
    useEffect(() => {
        if (location?.pathname){
            setOpenKeys(recombineOpenKeys(location?.pathname.match(/[/](\w+)/gi)))
            setSelectedKeys([location?.pathname])
        }
    }, [location?.pathname])
    const createItem = useCallback((v) => {
        return (<Item key={v.key}><Link to={v.key + (v.query || '')}><span>{v.title}</span></Link></Item>)
    }, [])
    const createSubMenu = useCallback(config => {
        return (
            (config.subs && config.subs.length > 0) ? <SubMenu key={config.key} title={config.title} icon={config.icon ? config.icon : <AppstoreOutlined />}>{config.subs.map(v => createSubMenu(v))}</SubMenu> : createItem(config)
        )
    }, [createItem])
    return (
        <Menu mode="inline" {...{selectedKeys, openKeys}} onOpenChange={keys => setOpenKeys(keys)}>
            {menus.map(v => createSubMenu(v))}
        </Menu>
    )
}
export default MenuItems