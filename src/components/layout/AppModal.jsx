import React from 'react';
import { Modal, Button, Typography } from 'antd';

const { confirm } = Modal;

const AppModal = ({
    isOpen,
    onClose,
    onDelete,
    selectedAsset
}) => {
    const handleDeleteConfirm = () => {
        confirm({
            title: 'Are you sure?',
            content: 'This action cannot be undone.',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                onDelete();
            },
        });
    };

    return (
        <Modal
            title="Asset Details"
            open={isOpen}
            onCancel={onClose}
            footer={[
                <Button
                    danger
                    onClick={handleDeleteConfirm}
                    key="delete"
                >
                    Delete
                </Button>,
                <Button key="cancel" onClick={onClose}>
                    Close
                </Button>
            ]}
        >
            {selectedAsset && (
                <div>
                    <Typography.Text strong>Asset Name:</Typography.Text>
                    <p>{selectedAsset.name}</p>

                    <Typography.Text strong>Amount:</Typography.Text>
                    <p>{selectedAsset.amount}</p>

                    <Typography.Text strong>Total Value:</Typography.Text>
                    <p>${selectedAsset.totalAmount.toFixed(2)}</p>
                </div>
            )}
        </Modal>
    );
};

export default AppModal;