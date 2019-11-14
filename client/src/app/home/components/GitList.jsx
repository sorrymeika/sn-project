import React from 'react';
import { Table, Button, message } from 'antd';
import { NCToolbar } from "nuclear";
import { inject } from 'snowball/app';
import GitModal from './GitModal';

function GitList({
    dataSource,
    onToEdit
}) {
    const columns = [{
        dataIndex: 'id',
        title: 'ID'
    }, {
        dataIndex: 'name',
        title: 'Git名称'
    }, {
        dataIndex: 'rootPath',
        title: '根目录'
    }, {
        dataIndex: 'status',
        title: '状态',
        width: 120,
        render(status, row) {
            return row.status == 1
                ? '克隆成功'
                : row.status == 2
                    ? '克隆中'
                    : row.status == 3
                        ? '克隆失败'
                        : '新建';
        }
    }, {
        dataIndex: 'operation',
        title: '操作',
        width: 120,
        render(text, row) {
            return (
                <>
                    <a
                        href="javascript:;"
                        onClick={() => message.warn('暂未开通!')}
                    >日志</a>
                </>
            );
        }
    }];

    return (
        <>
            <NCToolbar>
                <Button
                    onClick={() => onToEdit({})}
                >新增</Button>
            </NCToolbar>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
            <GitModal />
        </>
    );
}

export default inject(({ gitListService }) => {
    return {
        dataSource: gitListService.gitList,
        onToEdit: gitListService.onToEdit.emit,
    };
})(GitList);