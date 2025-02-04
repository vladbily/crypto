import React, { useContext, useState } from 'react';
import { Layout, Card, Statistic, List, Typography, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import CryptoContext from '../../context/crypto-context';
import AppModal from './AppModal';

const siderStyle = {
  padding: '1rem',
  height: 'calc(100vh - 64px)',
  overflowY: 'auto',
  backgroundColor: '#001529' // Добавляем фон контейнера
};

export default function AppSider() {
  const { assets, deleteAsset } = useContext(CryptoContext);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAsset(selectedAsset.id);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  return (
    <Layout.Sider
      width="25%"
      style={siderStyle}
      theme="light" // Фикс белой полосы
    >
      {assets.map((asset) => (
        <Card
          key={asset.id}
          style={{
            marginBottom: '1rem',
            cursor: 'pointer',
            borderRadius: '8px' // Фикс закруглений
          }}
          onClick={() => handleCardClick(asset)}
        >
          <Statistic
            title={asset.name}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              { title: 'Total Profit', value: asset.totalProfit, withTag: true },
              { title: 'Amount', value: asset.amount, isPlain: true },
            ]}
            renderItem={(item) => (
              <List.Item style={{ cursor: 'pointer' }}>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? 'green' : 'red'}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {item.isPlain && <span>{item.value}</span>}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}

      <AppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleConfirmDelete}
        selectedAsset={selectedAsset}
      />
    </Layout.Sider>
  );
}