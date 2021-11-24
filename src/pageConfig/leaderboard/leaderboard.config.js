/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/26
 */
import {Button} from "antd";
import React from "react";
import {downloadFirmRank, trackList} from "../../service";
import moment from "moment";

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
const market = [
    {id: 0, name: '全部企业'},
    {id: 1, name: '上市企业'},
    {id: 2, name: '非上市企业'},
]

export const searchFiled = [
    {type: 'input', filed: "name", name: '关键词', className: 'whole', wrapperCol: {span: 6}},
    {type: 'radio', filed: "track", name: '排行榜类型', className: 'whole', options: rankType, wrapperCol: {span: 18}, initialValue: 0, radioType: 'button', required: true},
    {type: 'select', filed: "market", name: '企业上市类型', options: market, initialValue: 0, required: true, className: 'whole', wrapperCol: {span: 6}},
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
        title: '详情',
        dataIndex: '详情',
        key: '详情',
        render: (text, record) => (
            <div style={{display: "inline-block", textAlign: 'left'}}>
                <div style={{margin: "4px 0"}}>注册资本：{record.register_capital ? record.register_capital + "万" : "暂无信息"}</div>
                <div style={{margin: "4px 0"}}>成立时间：{moment(record.register_time).format("YYYY-MM-DD")}</div>
                <div style={{margin: "4px 0"}}>参保人数：{record.insure ? record.insure + "人" : "暂无信息"}</div>
                <div style={{margin: "4px 0"}}>上市状态：{market.find(v => v.id / 1 === record.market / 1)?.name || "暂无信息"}</div>
            </div>
        ),
    },
    {
        title: '得分',
        dataIndex: 'total_score',
        key: 'total_score',
        render: (text, record, index, props) => (<div style={{fontWeight: 600}}>{text}</div>),
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
    exportMethod: ({data}) => downloadFirmRank({data: data.map(v => ({id: v.id, index: v.index}))}),//导出api接口
    searchMethod: trackList,
}