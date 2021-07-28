/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/14
 */
import React from "react";
import { Button } from "antd";
import ReplyModal from './replyModal'
import style from './index.module.less'
import classNames from "classnames";
import {getUrlParams, setUrlParams, setFiledProps} from "@/utils";
import { getPoliticalList } from "@/service"
import moment from 'moment';

const replyStatus = [
    {id: 0, name: '待回复'},
    {id: 1, name: '已回复'},
]
const condition = [
    {id: 'content', name: '事件内容描述'},
    {id: 'theme', name: '事件主题'},
    {id: 'realName', name: '用户名'},
    {id: 'phone', name: '手机号码'},
]
const searchFiled = [
    {type: 'date', filed: 'startTime', name: '开始时间', showTime: true, initialValue: moment().subtract(7, "days")},
    {type: 'date', filed: 'endTime', name: '结束时间', showTime: true},
    {type: 'select', filed: 'replyStatus', name: '回复状态', options: replyStatus, disabled: false},
    {type: 'selectInput', filed: ['condition', 'value'], name: '条件检索', options: condition}
]
const handleBtns = [
    {
        custom: (props) => {
            const { history, searchFiled, setSearchFiled, form } = props
            const { setFieldsValue } = form
            const replyStatus = getUrlParams(history.location.search, 'replyStatus')
            return (
                <Button
                    key="all"
                    className={classNames({[style.activeBtn]: replyStatus === undefined})}
                    onClick={() => {
                        setSearchFiled(setFiledProps(searchFiled, 'replyStatus', {disabled: false}))
                        setFieldsValue({replyStatus: undefined})
                        history.push('/app/mainPage/replyList')
                    }}
                >全部</Button>
            )
        }
    },
    {
        custom: (props) => {
            const { history, searchFiled, setSearchFiled, originalData } = props
            const replyStatus = getUrlParams(history.location.search, 'replyStatus')
            return (
                <Button
                    key="waitReply"
                    className={classNames({[style.activeBtn]: replyStatus === '0'})}
                    onClick={() => {
                        setSearchFiled(setFiledProps(searchFiled, 'replyStatus', {disabled: true}))
                        history.push('/app/mainPage/replyList' + setUrlParams({replyStatus: 0}))
                    }}
                >待回复（{originalData?.noReplyCount}）</Button>
            )
        }
    },
    {
        custom: (props) => {
            const { history, searchFiled, setSearchFiled, originalData } = props
            const replyStatus = getUrlParams(history.location.search, 'replyStatus')
            return (
                <Button
                    key="replied"
                    className={classNames({[style.activeBtn]: replyStatus === '1'})}
                    onClick={() => {
                        setSearchFiled(setFiledProps(searchFiled, 'replyStatus', {disabled: true}))
                        history.push('/app/mainPage/replyList' + setUrlParams({replyStatus: 1}))
                    }}
                >已回复（{originalData?.replyCount}）</Button>
            )
        }
    },
]

const columns = [
    {
        title: '事件内容描述',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: '事件主题',
        dataIndex: 'theme',
        key: 'theme',
        render: text => <span>{text}</span>,
    },
    {
        title: '提交时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
        title: '用户信息',
        dataIndex: 'realName',
        key: 'realName',
        render: text => <span>{text}</span>,
    },
    {
        title: '回复状态',
        dataIndex: 'replyStatusName',
        key: 'replyStatusName',
        render: text => <span>{text}</span>,
    },
    {
        title: '操作',
        dataIndex: '操作',
        key: '操作',
        render: (text, record, index, props) => <ReplyModal record={record} {...props} />,
    },
]
const beforeSearch = (params) => {
    const { condition_value: {condition, value} } = params
    params['startTime'] = params['startTime']?.format('YYYY-MM-DD HH:mm:ss')
    params['endTime'] = params['endTime']?.format('YYYY-MM-DD HH:mm:ss')
    params['page'] = params['current']
    if (condition) params[condition] = value
    delete params['condition_value']
    delete params['current']
    return params
}
const beforeShowData = (data) =>{
    const { pageData: { pageList, curPageNum, allCapacity, pageCapacity } } = data
    return {pageList, pageSize: pageCapacity, current: curPageNum, total: allCapacity}
}
const formSearchProps = {
    beforeSearch,
    beforeShowData,
    tableParams: {
        pagination: true,
        rowKey: 'id'
    },
    handleBtns,
    // searchMethod: getPoliticalList,
    autoRefresh: true,

}
export {
    searchFiled, columns, formSearchProps
}