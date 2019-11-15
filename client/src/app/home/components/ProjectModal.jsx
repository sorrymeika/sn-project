import React, { useRef } from 'react';
import { Modal, Input, Select } from 'antd';
import { inject } from 'snowball/app';
import { NCForm, NCFormItem } from 'nuclear';

const PROJECT_TYPES = [{
    label: 'html',
    value: 1
}, {
    label: 'nodejs framework',
    value: 2
}, {
    label: 'service',
    value: 3
}, {
    label: 'nodejs web',
    value: 4
}];

function ProjectModal({
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
                    label="类型"
                    field="type"
                    rules={[{ required: true, message: '必须选择类型' }]}
                >
                    <Select>
                        <Select.Option value="">请选择项目类型</Select.Option>
                        {
                            PROJECT_TYPES.map((projType) => {
                                return <Select.Option key={projType.value} value={projType.value}>{projType.label}</Select.Option>;
                            })
                        }
                    </Select>
                </NCFormItem>
                <NCFormItem
                    labelSpan={4}
                    label="GIT地址"
                    field="gitUrl"
                    rules={[{ required: true, message: '必须填写GIT地址' }]}
                >
                    <Input />
                </NCFormItem>
            </NCForm>
        </Modal>
    );
}

export default inject(({ projectModalService }) => {
    return {
        visible: projectModalService.isModalVisible,
        formData: projectModalService.formData,
        onFieldsChange: projectModalService.onFieldsChange.emit,
        onCancel: projectModalService.onCancel.emit,
        onSubmit: projectModalService.onSubmit.emit
    };
})(ProjectModal);