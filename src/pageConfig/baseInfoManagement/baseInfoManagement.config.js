/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/26
 */
import React from "react";
import { Button } from "antd"
import * as editConfig from "./edit.config"
import {baseInfoFindList, downloadFirmList, deleteFirm} from "../../service";
import { confirm, errorTip, successTip } from "@/utils"
import moment from "moment";
import {AuthPermission} from "@/components";
import { market, track, ratepaying_credit, fiscal_revenue,
    social_security, quit_rate, professional_expansion_rate, performance_growth_rate, debt_ratio, research_proportion, survival_time} from "./options"

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

export const searchFiled = [
    {type: 'input', filed: "name", name: '关键词', className: 'whole', wrapperCol: {span: 6}},
    {type: 'checkRange', filed: "register_capital", name: '注册资本', className: 'whole', options: registeredCapital, customRange: {type: 'text', unit: '万'}, wrapperCol: {span: 18}},
    {type: 'checkRange', filed: "register_time", name: '成立时间', className: 'whole', options: createTime, customRange: {type: 'date'}, wrapperCol: {span: 18}},
    {type: 'checkRange', filed: "insure", name: '参保人数', className: 'whole', options: contributors, customRange: {type: 'text', unit: '人'}, wrapperCol: {span: 19}},
    {type: 'checkRange', filed: "finance_round", name: '融资轮次', className: 'whole', options: [], wrapperCol: {span: 18}, customRange: {type: 'text', unit: '轮'}},
    {type: 'checkRange', filed: "market", name: '上市状态', className: 'whole', options: market, wrapperCol: {span: 18}},
    {type: 'checkRange', filed: "track", name: '赛道', className: 'whole', options: track, wrapperCol: {span: 18}},
    {type: 'checkRange', filed: "ratepaying_credit", name: '纳税信用评级', className: 'whole', options: ratepaying_credit, wrapperCol: {span: 18}},
    {type: 'checkRange', filed: "fiscal_revenue", name: '最新财年营收', className: 'whole', options: fiscal_revenue, wrapperCol: {span: 18}},
    {type: 'checkRange', filed: "social_security", name: '社保缴纳基数', className: 'whole', options: social_security, wrapperCol: {span: 18}},
    {type: 'checkRange', filed: "quit_rate", name: '离职率', className: 'whole', options: quit_rate, wrapperCol: {span: 18}},
    {type: 'checkRange', filed: "professional_expansion_rate", name: '研发人员扩张率', className: 'whole', options: professional_expansion_rate, wrapperCol: {span: 18}},
    {type: 'checkRange', filed: "performance_growth_rate", name: '(营收)业绩增长率', className: 'whole', options: performance_growth_rate, wrapperCol: {span: 18}},
    {type: 'checkRange', filed: "debt_ratio", name: '负债率', className: 'whole', options: debt_ratio, wrapperCol: {span: 18}},
    {type: 'checkRange', filed: "research_proportion", name: '研发费用占比', className: 'whole', options: research_proportion, wrapperCol: {span: 18}},
    {type: 'checkRange', filed: "survival_time", name: '存续时间', className: 'whole', options: survival_time, wrapperCol: {span: 18}},
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
            <div style={{display: "inline-block", textAlign: 'left'}}>
                <div style={{margin: "4px 0"}}>注册资本：{record.register_capital ? record.register_capital + "万" : "暂无信息"}</div>
                <div style={{margin: "4px 0"}}>成立时间：{moment(record.register_time).format("YYYY-MM-DD")}</div>
                <div style={{margin: "4px 0"}}>参保人数：{record.insure ? record.insure + "人" : "暂无信息"}</div>
                <div style={{margin: "4px 0"}}>上市状态：{market.find(v => v.id / 1 === record.market / 1)?.name || "暂无信息"}</div>
            </div>
        ),
    },
    {
        title: '赛道',
        dataIndex: 'track',
        key: 'track',
        render: text => <div style={{margin: "4px 0"}}>{text && text?.length > 0 ? text?.map(v => (track.find(item => item.id / 1 === v / 1)).name).join('、') : "暂无信息"}</div>,
        width: 240
    },
    {
        title: '得分',
        dataIndex: 'total_score',
        key: 'total_score',
        render: text => (<div style={{fontWeight: 600}}>{text}</div>),
        width: 240
    },
    {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        render: (text, record, index, props) => (
            <div className="handleBtnBoX">
                <Button style={{width: 90}} onClick={() => props.history.push(props.history.location.pathname + '/info/' + text)}>更多详情</Button>
                <AuthPermission permission="can_add"><Button style={{width: 90}} onClick={() => props.history.push(props.history.location.pathname + '/edit/' + text)}>修改</Button></AuthPermission>
                <AuthPermission permission="can_delete"><Button style={{width: 90}} onClick={() => removeData(record, props)}>删除</Button></AuthPermission>
            </div>
        ),
        width: 330
    },
]

const beforeSearch = (params) => {
    const { name, register_capital, register_time, insure, finance_round, market, track, pageSize, current,
        ratepaying_credit, fiscal_revenue, social_security, quit_rate, professional_expansion_rate, performance_growth_rate, debt_ratio, research_proportion, survival_time} = params
    let data = {name, pageSize, current}
    data['register_capital'] = {options: register_capital.options || [], range: handleData(register_capital.customRange, '-','万')}
    data['register_time'] = {options: register_time.options || [], range: handleData(register_time.customRange, ' ~ ','万')}
    data['insure'] = {options: insure.options || [], range: handleData(insure.customRange, '-','人')}
    data['finance_round'] = {options: finance_round.options || [], range: handleData(finance_round.customRange, '-','轮')}
    data['market'] = {options: market.options || []}
    data['track'] = {options: track.options || []}
    data['ratepaying_credit'] = {options: ratepaying_credit.options || []}
    data['fiscal_revenue'] = {options: fiscal_revenue.options || []}
    data['social_security'] = {options: social_security.options || []}
    data['quit_rate'] = {options: quit_rate.options || []}
    data['professional_expansion_rate'] = {options: professional_expansion_rate.options || []}
    data['performance_growth_rate'] = {options: performance_growth_rate.options || []}
    data['debt_ratio'] = {options: debt_ratio.options || []}
    data['research_proportion'] = {options: research_proportion.options || []}
    data['survival_time'] = {options: survival_time.options || []}
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
    const { id } = data
    const { setLoading, onSearch } = props
    confirm({
        title: "确认删除？",
        onOk: (close) => {
            close()
            setLoading(true)
            deleteFirm({ids: [id]}).then(res => {
                setLoading(false)
                if (res.status !== 200) return errorTip(res.msg)
                onSearch()
                successTip()
            })
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
    addShow: 'can_add', //添加按钮
    removeShow: 'can_delete', // 批量删除按钮
    exportShow: true, // 导出按钮
    exportMethod: ({data, selectedRow}) => downloadFirmList({ids: (selectedRow.length === 0 ? data : selectedRow).map(v => v.id)}),//导出api接口
    searchMethod: baseInfoFindList,
    filedFold: 4, // 展示个数
    batchRemoveMethod: ({selectedRow}) => deleteFirm({ids: selectedRow.map(v => v.id)})
}
export {
    editConfig
}