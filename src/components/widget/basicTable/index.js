/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/14
 */
import React, {useEffect, useMemo, useState} from "react";
import { Table } from 'antd';
const BasicTable = (props) => {
    const { columns, data, tableParams = {}, paginationData = {}, onChangePagination, isHasBtn = true, selectedRow, setSelectedRow} = props
    const { rowSelection, pagination, rowKey } = tableParams
    const rowSelectionParams = useMemo(() => ({
        fixed: true,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRow([...selectedRows])
        },
        selectedRowKeys: selectedRow.map(v => v[rowKey])
    }), [selectedRow, rowKey, setSelectedRow])
    const [pagePagination, setPagePagination] = useState({ pageSize: 10, current: 1, total: 0 })
    useEffect(() => {
        paginationData && setPagePagination({...paginationData})
    }, [paginationData, rowKey])
    const paginationParams = useMemo(() => ({
        position: 'bottomRight',
        pageSizeOptions: [10, 20, 50, 100],
        showSizeChanger: true,
        showQuickJumper: true,
        onChange: (page, pageSize) => {
            if (onChangePagination){
                onChangePagination(page, pageSize)
            }else {
                setPagePagination({...pagePagination, current: page, pageSize})
            }
        }
    }), [pagePagination, onChangePagination])
    return (
        <Table
            rowKey={rowKey}
            columns={columns}
            dataSource={data}
            scroll={{x: 1080}}
            sticky={isHasBtn ? {offsetHeader: 52} : true}
            rowSelection={rowSelection && {...rowSelectionParams}}
            pagination={pagination && {...paginationParams, ...pagePagination}}
        />
    )
}
export default React.memo(BasicTable)