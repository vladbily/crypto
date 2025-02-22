import { urls } from "./utility";

export async function fakeFetchCrypro() {
    const response = await fetch(`${urls.URL_BACK}/currencies/`, {
        method: "GET",
        headers: { "Accept": "application/json" },
    })
    if (response.ok === true) {
        return await response.json()
    }
}

export async function fetchAssets() {
    const response = await fetch(`${urls.URL_BACK}/assets/`, {
        method: "GET",
        headers: { "Accept": "application/json" },
    })
    if (response.ok === true) {
        return await response.json()
    }
}

export async function addNewAsset(asset) {
    const response = await fetch(`${urls.URL_BACK}/assets/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(asset),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to add asset');
    }

    return await response.json();
}


export const deleteAssetsByName = async (name) => {
    const response = await fetch(`${urls.URL_BACK}/assets/${name}`, {
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete asset');
    }

    return await response.json();
}
