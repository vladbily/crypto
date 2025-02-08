import React from 'react';
import { Modal, Button, Typography } from 'antd';
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

const AppModal = ({ open, onClose, onDelete, asset }) => {
    const showDeleteConfirm = () => {
        confirm({
            title: 'Подтвердите удаление',
            icon: <ExclamationCircleFilled />,
            content: `Вы уверены, что хотите удалить все записи ${asset?.name}?`,
            okText: 'Удалить',
            okType: 'danger',
            cancelText: 'Отмена',
            onOk() {
                onDelete();
                onClose();
            },
        });
    };

    return (
        <Modal
            title={`Управление ${asset?.name}`}
            open={open}
            onCancel={onClose}
            footer={[
                <Button
                    key="delete"
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={showDeleteConfirm}
                >
                    Удалить все
                </Button>,
                <Button key="cancel" onClick={onClose}>
                    Закрыть
                </Button>
            ]}
        >
            {asset && (
                <div>
                    <Typography.Text strong>Общее количество:</Typography.Text>
                    <p>{asset.amount}</p>

                    <Typography.Text strong>Текущая стоимость:</Typography.Text>
                    <p>${asset.totalAmount.toFixed(2)}</p>
                </div>
            )}
        </Modal>
    );
};

export default AppModal;