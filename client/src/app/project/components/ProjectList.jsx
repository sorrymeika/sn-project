import React from 'react';
import { Table, Divider } from 'antd';
import { inject, autowired } from 'snowball/app';
import ProjectLogsModal from './ProjectLogsModal';
import ProjectModal from './ProjectModal';

function ProjectList({
    dataSource,
    onPublish,
    onShowLog
}) {
    const columns = [{
        dataIndex: 'id',
        title: 'ID'
    }, {
        dataIndex: 'name',
        title: '项目名称'
    }, {
        dataIndex: 'gitUrl',
        title: 'GIT地址'
    }, {
        dataIndex: 'type',
        title: '应用类型',
        width: 120,
        render(type, row) {
            return row.type == 1
                ? 'html'
                : row.type == 2
                    ? 'nodejs framework'
                    : row.type == 3
                        ? 'service'
                        : row.type == 4
                            ? 'eggjs web'
                            : row.type;
        }
    }, {
        dataIndex: 'status',
        title: '状态',
        width: 120,
        render(status, row) {
            return row.status == 1
                ? '发布成功'
                : row.status == 2
                    ? '发布中'
                    : row.status == 3
                        ? '发布失败'
                        : '未发布';
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
                        onClick={() => onShowLog(row)}
                    >日志</a>
                    {
                        row.status != 2 && (
                            <>
                                <Divider type="vertical"></Divider>
                                <a
                                    href="javascript:;"
                                    onClick={() => onPublish(row)}
                                >发布</a>
                            </>
                        )
                    }
                </>
            );
        }
    }];

    return (
        <>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
            <ProjectLogsModal></ProjectLogsModal>
            <ProjectModal />
        </>
    );
}

export default inject(() => {
    const projectListViewModel = autowired('projectListViewModel');
    return {
        dataSource: projectListViewModel.projectList,
        onShowLog: projectListViewModel.onShowLog.emit,
        onPublish: projectListViewModel.onPublish.emit
    };
})(ProjectList);