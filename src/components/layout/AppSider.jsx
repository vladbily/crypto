import { Layout, Card, Statistic, List, Typography, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context';

const siderStyle = {
  padding: '1rem',
};

const handleClick = (item) => {
  console.log('Clicked item:', item);
  alert(`You clicked on ${item.title}`);
};

export default function AppSider() {
  const { assets } = useContext(CryptoContext)

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: '1rem' }}>
          <Statistic
            title={asset.id}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$" />
          <List
            size='small'
            dataSource={[
              { title: 'Total Profit', value: asset.totalProfit, withTag: true },
              { title: 'Amount', value: asset.amount, isPlain: true },
              //{ title: 'Difference', value: asset.growPercent },
            ]}
            renderItem={(item) => (
              <List.Item onClick={() => handleClick(item)} style={{ cursor: 'pointer' }}>
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
    </Layout.Sider>
  )
}