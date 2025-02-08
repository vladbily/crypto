import { Layout, Typography } from 'antd';
import { useCrypto } from '../../context/crypto-context'
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable';

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#26091b',
    padding: '1rem',
    overflow: 'hidden'
};

export default function AppContent() {
    const { assets, crypto } = useCrypto();
    const cryptoPriceMap = crypto.reduce((acc, c) => {
        acc[c.id] = c.price;
        return acc;
    }, {});

    const totalValue = assets
        .map((asset) => asset.amount * cryptoPriceMap[asset.name])
        .reduce((acc, v) => acc + v, 0);

    return (
        <Layout.Content style={contentStyle}>
            {assets.length > 0 && (
                <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
                    Portfolio: {totalValue.toFixed(2)}$
                </Typography.Title>
            )}
            <PortfolioChart />
            <AssetsTable />
        </Layout.Content>
    );
}
