import React, { useState } from 'react';
import { Layout, Card, Statistic, List, Typography, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useCrypto } from '../../context/crypto-context';
import AppModal from './AppModal';

const siderStyle = {
  padding: '1rem',
  height: 'calc(100vh - 60px)',
  overflowY: 'auto',
  backgroundColor: '#26091b',
};

export default function AppSider() {
  const { assets, deleteAssetsByName } = useCrypto();
  console.log("AppSider: assets:", assets);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleCardClick = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  return (
    <Layout.Sider width="25%" style={siderStyle} theme="light">
      {assets.map((asset) => (
        <Card
          key={asset.id} // Убедитесь, что `id` уникален
          style={{ marginBottom: '1rem', cursor: 'pointer', borderRadius: 8 }}
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
              { title: 'Amount', value: asset.amount.toFixed(2), isPlain: true },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? 'green' : 'red'}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {item.isPlain && item.value}
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
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={() => deleteAssetsByName(selectedAsset?.name)}
        asset={selectedAsset}
      />
    </Layout.Sider>
  );
}