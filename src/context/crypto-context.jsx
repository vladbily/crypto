import { createContext, useState, useEffect, useContext } from "react";
import { fakeFetchCrypro, fetchAssets } from '../api';
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
            const coin = result.find((c) => c.id === asset.id)
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * (coin.price - asset.price),
                name: coin.name,
                ...asset,
            }
        })
    }

    function addAsset(newAsset) {
        setAssets((prev) => mapAssets([...prev, newAsset], crypto))
    }

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const result = await fakeFetchCrypro()
            const assets = await fetchAssets()

            setAssets(mapAssets(assets, result))
            setCrypto(result)
            setLoading(false)
        }
        preload()
    }, [])
    return <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>{children}</CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto() {
    return useContext(CryptoContext)
}

