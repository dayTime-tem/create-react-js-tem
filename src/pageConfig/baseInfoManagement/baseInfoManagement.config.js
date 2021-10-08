/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/26
 */
import React from "react";
import { Button } from "antd"
import * as editConfig from "./edit.config"
import {baseInfoFindList} from "../../service";
import { confirm, errorTip, successTip } from "@/utils"
import moment from "moment";
const registeredCapital = [
    {id: 1, name: '100万以内'},
    {id: 2, name: '100万-200万'},
    {id: 3, name: '200万-500万'},
    {id: 4, name: '500万-1000万'},
    {id: 5, name: '1000万以上'},
]
const createTime = [
    {id: 1, name: '1年内'},
    {id: 2, name: '1-5年'},
    {id: 3, name: '5-10年'},
    {id: 4, name: '10-15年'},
    {id: 5, name: '15年以上'},
]
const contributors = [
    {id: 1, name: '小于50人'},
    {id: 2, name: '50-99人'},
    {id: 3, name: '100-499人'},
    {id: 4, name: '500-999人'},
    {id: 5, name: '1000-4999人'},
    {id: 6, name: '5000-9999人'},
    {id: 7, name: '10000人以上'},
]
const financeInfo = [
    {id: 1, name: '未融资'},
    {id: 2, name: '天使/种子轮'},
    {id: 3, name: 'PreA至A+轮'},
    {id: 4, name: 'PreB至B+轮'},
    {id: 5, name: 'C轮及以上'},
    {id: 6, name: 'IPO上市'},
    {id: 7, name: '并购/合并'},
    {id: 8, name: '战略融资/投资'},
    {id: 9, name: '股权融资/转让'},
    {id: 10, name: '定向增发'},
    {id: 0, name: '其他'},
]
const listedState = [
    {id: 1, name: '未上市'},
    {id: 2, name: 'A股'},
    {id: 3, name: '中概股'},
    {id: 4, name: '港股'},
    {id: 5, name: '科创板'},
    {id: 6, name: '新三板'},
    {id: 7, name: '新四板'},
]
const track = [
    {id: 1, name: '互联网基础软硬件'},
    {id: 2, name: '互联网前沿技术与平台'},
    {id: 3, name: '网络安全'},
    {id: 4, name: '网络信息服务'},
    {id: 5, name: '人工智能'},
    {id: 6, name: '大数据'},
    {id: 7, name: '云计算'},
    {id: 8, name: '互联网+'},
]
export const searchFiled = [
    {type: 'input', filed: "name", name: '关键词', className: 'whole', wrapperCol: {span: 6}},
    {type: 'check', filed: "register_capital", name: '注册资本', className: 'whole', options: registeredCapital, customRange: {type: 'text', unit: '万'}, wrapperCol: {span: 18}},
    {type: 'check', filed: "register_time", name: '成立时间', className: 'whole', options: createTime, customRange: {type: 'date'}, wrapperCol: {span: 18}},
    {type: 'check', filed: "insure", name: '参保人数', className: 'whole', options: contributors, customRange: {type: 'text', unit: '人'}, wrapperCol: {span: 19}},
    {type: 'check', filed: "finance_round", name: '融资信息', className: 'whole', options: financeInfo, wrapperCol: {span: 18}},
    {type: 'check', filed: "market", name: '上市状态', className: 'whole', options: listedState, wrapperCol: {span: 18}},
    {type: 'check', filed: "track", name: '赛道', className: 'whole', options: track, wrapperCol: {span: 18}},
]

export const columns = [
    {
        title: '企业名称',
        dataIndex: 'name',
        key: 'name',
        width: 300
    },
    {
        title: '详情',
        dataIndex: '详情',
        key: '详情',
        render: (text, record) => (
            <div>
                <div style={{margin: "4px 0"}}>注册资本：{record.register_capital}万</div>
                <div style={{margin: "4px 0"}}>成立时间：{moment(record.register_time).format("YYYY-MM-DD")}</div>
                <div style={{margin: "4px 0"}}>员工人数：{record.insure}</div>
                <div style={{margin: "4px 0"}}>融资信息：{financeInfo.find(v => v.id / 1 === record.finance_round / 1)?.name}</div>
                <div style={{margin: "4px 0"}}>上市状态：{listedState.find(v => v.id / 1 === record.market / 1)?.name}</div>
                <div style={{margin: "4px 0"}}>赛道：{record.track?.map(v => (track.find(item => item.id / 1 === v / 1)).name).join('、')}</div>
            </div>
        ),
    },
    {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        render: (text, record, index, props) => (
            <div className="handleBtnBoX">
                <Button onClick={() => props.history.push(props.history.location.pathname + '/info/' + text)}>更多详情</Button>
                <Button onClick={() => props.history.push(props.history.location.pathname + '/edit/' + text)}>修改</Button>
                <Button onClick={() => removeData(record, props)}>删除</Button>
            </div>
        ),
        width: 300
    },
]

const beforeSearch = (params) => {
    const { name, register_capital, register_time, insure, finance_round, market, track, pageSize, current } = params
    let data = {name, pageSize, current}
    data['register_capital'] = {options: register_capital.options || [], range: handleData(register_capital.customRange, '-','万')}
    data['register_time'] = {options: register_time.options || [], range: handleData(register_time.customRange, ' ~ ','万')}
    data['insure'] = {options: insure.options || [], range: handleData(insure.customRange, '-','人')}
    data['finance_round'] = {options: finance_round.options || []}
    data['market'] = {options: market.options || []}
    data['track'] = {options: track.options || []}
    return data
}
const handleData = (data, separator, unit) => {
    if (!data) return []
    return data.map(v => {
        const [start, end] = v.split(separator)
        return ({start: start.split(unit)[0], end: end.split(unit)[0]})
    })
}

const removeData = (data, props) => {
    const { setLoading, onSearch } = props
    confirm({
        title: "确认删除？",
        onOk: (close) => {
            close()
            setLoading(true)
            // 模拟发请求
            let res = {status: 200}
            setTimeout(() => {
                //页面刷新
                if (res.status !== 200) return errorTip(res.message)
                onSearch()
                successTip()
                setLoading(false)
            }, 1000)
        }
    })
};

export const formSearchProps = {
    beforeSearch,
    tableParams: {
        pagination: true,
        rowKey: 'id',
        rowSelection: true, // 列表是否可勾选
    },
    addShow: true, //添加按钮
    removeShow: true, // 批量删除按钮
    exportShow: true, // 导出按钮
    // exportMethod: //导出api接口
    searchMethod: baseInfoFindList,
}
export {
    editConfig
}