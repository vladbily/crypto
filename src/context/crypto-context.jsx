import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { fakeFetchCrypro, fetchAssets, addNewAsset, deleteAssetsByName } from '../api';
import { percentDifference } from '../utility';

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
    addAsset: () => { },
    deleteAssetsByName: () => { },
});

export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    const aggregatedAssets = useMemo(() => {
        return assets.reduce((acc, asset) => {
            const existing = acc.find(a => a.name === asset.name);
            const coin = crypto.find(c => c.id === asset.name);

            if (coin) {
                if (existing) {
                    existing.amount += asset.amount;
                    existing.totalAmount += asset.amount * coin.price;
                    existing.totalProfit += asset.amount * (coin.price - asset.price);
                } else {
                    acc.push({
                        ...asset,
                        amount: asset.amount,
                        totalAmount: asset.amount * coin.price,
                        totalProfit: asset.amount * (coin.price - asset.price),
                        grow: coin.price > asset.price,
                        growPercent: percentDifference(asset.price, coin.price),
                    });
                }
            }
            return acc;
        }, []);
    }, [assets, crypto]);

    // Исправленная функция addAsset с использованием функционального обновления состояния
    const addAsset = async (newAsset) => {
        try {
            console.log("addAsset: newAsset перед addNewAsset:", newAsset); // <----- ADD THIS LOG
            const tempAsset = { ...newAsset, id: Date.now() };
            const addedAsset = await addNewAsset(tempAsset);
            console.log("addAsset: addedAsset после addNewAsset:", addedAsset); // <----- ADD THIS LOG

            setAssets(prevAssets => {
                const updatedAssets = [...prevAssets, {
                    ...addedAsset,
                    id: addedAsset.id || tempAsset.id
                }];
                console.log("addAsset: updatedAssets перед setAssets:", updatedAssets); // <----- ADD THIS LOG
                return updatedAssets;
            });
        } catch (error) {
            console.error('Error adding asset:', error);
        }
    };


    const handleDeleteAssets = async (assetName) => {
        try {
            await deleteAssetsByName(assetName);
            setAssets(prev => prev.filter(a => a.name !== assetName));
        } catch (error) {
            console.error('Error deleting assets:', error);
        }
    };

    useEffect(() => {
        async function preload() {
            setLoading(true);
            const result = await fakeFetchCrypro();
            const assets = await fetchAssets();
            setAssets(assets);
            setCrypto(result);
            setLoading(false);
        }
        preload();
    }, []);

    return (
        <CryptoContext.Provider value={{
            loading,
            crypto,
            assets: aggregatedAssets,
            rawAssets: assets,
            addAsset,
            deleteAssetsByName: handleDeleteAssets
        }}>
            {children}
        </CryptoContext.Provider>
    );
}

export default CryptoContext;

export function useCrypto() {
    return useContext(CryptoContext);
}