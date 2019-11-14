import React, { useRef } from 'react';
import { Modal, Input } from 'antd';
import { inject } from 'snowball/app';
import { NCForm, NCFormItem } from 'nuclear';

function GitModal({
    visible,
    formData,
    onFieldsChange,
    onSubmit,
    logs,
    onCancel
}) {

    const formRef = useRef();

    return (
        <Modal
            visible={visible}
            title={formData.id ? "编辑Git库" : '新增Git库'}
            onCancel={onCancel}
            cancelText={'取消'}
            onOk={() => {
                formRef.current.submit();
            }}
            okText={'确定'}
            style={{ top: 0 }}
        >
            <NCForm
                ref={formRef}
                data={formData}
                onFieldsChange={onFieldsChange}
                onSubmit={onSubmit}
            >
                <NCFormItem
                    labelSpan={4}
                    label="名称"
                    field="name"
                    rules={[{ required: true, message: '必须填写名称' }]}
                >
                    <Input />
                </NCFormItem>
                <NCFormItem
                    labelSpan={4}
                    label="GIT地址"
                    field="gitUrl"
                    rules={[{ required: true, message: '必须填写GIT地址' }]}
                >
                    <Input />
                </NCFormItem>
                <NCFormItem
                    labelSpan={4}
                    label="父目录"
                    field="rootPath"
                    rules={[{ required: true, message: '必须填写父目录' }]}
                >
                    <Input />
                </NCFormItem>
            </NCForm>
        </Modal>
    );
}

export default inject(({ gitModalService }) => {
    return {
        visible: gitModalService.isModalVisible,
        formData: gitModalService.formData,
        onFieldsChange: gitModalService.onFieldsChange.emit,
        onCancel: gitModalService.onCancel.emit,
        onSubmit: gitModalService.onSubmit.emit
    };
})(GitModal);