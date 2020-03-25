import ReactDOM from 'react-dom';
import React, { useLayoutEffect, useRef } from 'react';
import { Modal } from 'antd';
import { inject } from 'snowball/app';

function ProjectLogsModal({
    visible,
    logs,
    currentProject,
    onCancel,
    onDoPublish
}) {
    const modalRef = useRef();
    useLayoutEffect(() => {
        if (modalRef.current && ReactDOM.findDOMNode(modalRef.current)) {
            const modalBody = ReactDOM.findDOMNode(modalRef.current).querySelector('.ant-modal-body');
            modalBody.scrollTop = modalBody.scrollHeight - modalBody.clientHeight;
        }
    }, [logs.length]);

    return (
        <Modal
            ref={modalRef}
            visible={visible}
            title={"发布日志 - " + (currentProject && currentProject.name)}
            onCancel={onCancel}
            cancelText={'取消'}
            onOk={onDoPublish}
            okText={'强制发布'}
            width={'80%'}
            style={{ top: 0 }}
        >
            {
                logs && logs.map((log, i) => <pre key={i}>{log}</pre>)
            }
        </Modal>
    );
}

export default inject(({ projectLogViewModel }) => {
    return {
        currentProject: projectLogViewModel.currentProject,
        visible: projectLogViewModel.isModalVisible,
        logs: projectLogViewModel.logs,
        onDoPublish: projectLogViewModel.onDoPublish.emit,
        onCancel: projectLogViewModel.onCancel.emit
    };
})(ProjectLogsModal);