import { Table } from 'antd';
import { useCrypto } from '../context/crypto-context';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        showSorterTooltip: {
            target: 'full-header',
        },
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Price, $',
        dataIndex: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        onFilter: (value, record) => record.address.indexOf(value) === 0,
        sorter: (a, b) => a.amount - b.amount,
    },
    {
        title: 'Date',
        dataIndex: 'date',
        defaultSortOrder: 'descend',
        sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
];

export default function AssetsTable() {
    const { rawAssets } = useCrypto();
    console.log("AssetsTable: rawAssets:", rawAssets);

    if (rawAssets.length == 0) {
        return null
    }

    return (

        <div style={{
            height: 'calc(30vh - 16px)',
            overflowY: 'auto',
            margin: '16px 0',
            border: '#f0f0f0',
            borderRadius: 8
        }}>
            <Table
                columns={columns}
                dataSource={rawAssets}
                pagination={false}
                rowKey="id"
                locale={{
                    emptyText: 'Нет данных для отображения'
                }}
            />
        </div>
    );
}