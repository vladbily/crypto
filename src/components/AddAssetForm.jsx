import { useState, useRef } from "react"
import { useCrypto } from "../context/crypto-context"
import { Select, Space, Divider, Form, Button, InputNumber, DatePicker, Result } from 'antd'
import CoinInfo from './CoinInfo';

const validateMessage = {
    required: '${label} is required! ',
    types: {
        number: '${label} is not valid number ',
    },
    number: {
        range: '${label} must be between ${min} and {max} ',
    },
}

export default function AddAssetForm({ onClose }) {
    const [form] = Form.useForm()
    const [coin, setCoin] = useState(null)
    const { crypto, addAsset } = useCrypto()
    const [submitted, setSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const assetRef = useRef()

    if (submitted) {
        return (
            <Result
                status="success"
                title="New Asset Added!"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Close
                    </Button>,
                ]}
            />
        )
    }
    if (errorMessage) {
        return (
            <Result
                status="error"
                title="Operation Failed"
                subTitle={errorMessage}
                extra={[
                    <Button type="primary" key="console" onClick={() => setErrorMessage('')}>
                        Close
                    </Button>
                ]}
            />
        );
    }

    if (!coin) {
        return (
            <Select className="custom-select"
                style={{ width: '100%', borderColor: '#d1479d' }}
                onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
                placeholder="Select Coin"
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} />
                        {option.data.label}
                    </Space>
                )}
            />
        )
    }

    async function onFinish(values) {
        console.log('finish', values);
        const amount = values.amount;

        if (amount <= 0) {
            setErrorMessage('Amount must be greater than 0');
            return;
        }

        const newAsset = {
            name: coin.id,
            amount: amount,
            price: values.price,
            date: values.date ? values.date.toISOString() : new Date().toISOString(),
        };
        assetRef.current = newAsset;

        try {
            await addAsset(newAsset);
            setSubmitted(true);
            setErrorMessage('');
        } catch (error) {
            console.error('Failed to add asset:', error);
            setSubmitted(false);
            setErrorMessage(error.message || 'Failed to add asset. Please try again.'); // Отображаем сообщение об ошибке
        }
    }

    function handleAmountChange(value) {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2)
        })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(value * amount).toFixed(2)
        })
    }

    return <Form className="custom-form"
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        style={{ maxWidth: 600 }}
        initialValues={{ price: +coin.price.toFixed(2) }}
        onFinish={onFinish}
        validateMessages={validateMessage}
    >
        <CoinInfo coin={coin} />
        <Divider />

        <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, type: 'number', min: 0 }]}
        >
            <InputNumber
                placeholder="Enter coin amount"
                onChange={handleAmountChange}
                style={{ width: '100%', borderColor: '#d1479d' }}
            />
        </Form.Item>

        <Form.Item label="Price" name="price">
            <InputNumber
                style={{ width: '100%', borderColor: '#d1479d' }}
                onChange={handlePriceChange}
            />
        </Form.Item>

        <Form.Item label="Date" name="date">
            <DatePicker
                showTime
                style={{ width: '100%', borderColor: '#d1479d' }}
            />
        </Form.Item>

        <Form.Item label="Total" name="total">
            <InputNumber
                disabled
                style={{ width: '100%', borderColor: '#d1479d' }}
            />
        </Form.Item>

        <Form.Item label={null}>
            <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: '#d1479d', borderColor: '#d1479d' }}
            >
                Add Asset
            </Button>
        </Form.Item>
    </Form>
}