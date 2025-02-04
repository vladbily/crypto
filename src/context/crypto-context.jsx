import { createContext, useState, useEffect, useContext } from "react";
import { fakeFetchCrypro, fetchAssets, addNewAsset, deleteAssets } from '../api';
import { percentDifference } from '../utility';

const CryptoContext = createContext({
    assets: [],
    crypro: [],
    loading: false,
})

export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    function mapAssets(asset, result) {
        return asset.map(asset => {
            const coin = result.find((c) => c.id === asset.name.toLowerCase());
            if (!coin) {
                console.warn(`Coin not found for asset with name: ${asset.name}`);
                return {
                    ...asset,
                    grow: false,
                    growPercent: 0,
                    totalAmount: 0,
                    totalProfit: 0,
                    name: 'Unknown',
                };
            }
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * (coin.price - asset.price),
                name: coin.name,
                ...asset,
            };
        });
    }

    function addAsset(newAsset) {
        async function postAsset(asset) {
            try {
                const response = await addNewAsset(asset);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                return result; // Сервер возвращает ассет с id
            } catch (error) {
                console.error('Error adding asset:', error);
                throw error;
            }
        }

        postAsset(newAsset)
            .then((addedAsset) => { // Используем ассет из ответа сервера
                setAssets((prev) => mapAssets([...prev, addedAsset], crypto));
            })
            .catch((error) => {
                console.error('Failed to add asset:', error);
            });
    }


    useEffect(() => {
        async function preload() {
            setLoading(true);
            const result = await fakeFetchCrypro();
            const assets = await fetchAssets();

            console.log('Fetched crypto:', result);
            console.log('Fetched assets:', assets);

            setAssets(mapAssets(assets, result));
            setCrypto(result);
            setLoading(false);
        }
        preload();
    }, []);

    const deleteAsset = async (assetId) => {
        try {
            await deleteAssets(assetId);
            setAssets(prev => prev.filter(asset => asset.id !== assetId));

        } catch (error) {
            console.error('Delete asset error:', error);
            throw error;
        }
    };

    return <CryptoContext.Provider value={{ loading, crypto, assets, addAsset, deleteAsset }}>{children}</CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto() {
    return useContext(CryptoContext)
}

