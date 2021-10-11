/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/26
 */
import {Button} from "antd";
import React from "react";
import {trackList} from "../../service";

const rankType = [
    {id: 0, name: '综合实力排行'},
    {id: 1, name: '互联网基础软硬件'},
    {id: 2, name: '互联网前沿技术与平台'},
    {id: 3, name: '网络安全'},
    {id: 4, name: '网络信息服务'},
    {id: 5, name: '人工智能'},
    {id: 6, name: '大数据'},
    {id: 7, name: '云计算'},
    {id: 8, name: '互联网+'},
    {id: 9, name: '其他'},
]


export const searchFiled = [
    {type: 'input', filed: "name", name: '关键词', className: 'whole', wrapperCol: {span: 6}},
    {type: 'radio', filed: "track", name: '排行榜类型', className: 'whole', options: rankType, wrapperCol: {span: 18}, initialValue: 0, radioType: 'button', required: true},
]

export const columns = [
    {
        title: '排名',
        dataIndex: 'index',
        key: 'index',
        width: 180
    },
    {
        title: '企业名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '得分',
        dataIndex: 'total_score',
        key: 'total_score',
        render: (text, record, index, props) => (<div>{text}</div>),
        width: 240
    },
    {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        render: (text, record, index, props) => {
            return (
                <div className="handleBtnBoX">
                    <Button onClick={() => props.history.push('/app/baseInfoManagement/info/' +text)}>查看详情</Button>
                </div>
            )
        },
        width: 120
    },
]
const beforeSearch = (params) => {
    if (params['track'] === 0) delete params['track']
    return params
}

export const formSearchProps = {
    beforeSearch,
    tableParams: {
        pagination: true,
        rowKey: 'id',
    },
    exportShow: true, // 导出按钮
    // exportMethod: //导出api接口
    searchMethod: trackList,
}