export async function fakeFetchCrypro() {
    const response = await fetch("http://localhost:8000/currencies", {
        method: "GET",
        headers: { "Accept": "application/json" },
    })
    if (response.ok === true) {
        return await response.json()
    }
}

export async function fetchAssets() {
    const response = await fetch("http://localhost:8000/assets", {
        method: "GET",
        headers: { "Accept": "application/json" },
    })
    if (response.ok === true) {
        return await response.json()
    }
}

export async function addNewAsset(asset) {
    const response = await fetch("http://localhost:8000/assets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(asset),
    });
    return response
}

export async function deleteAssets(assetId) {
    const response = await fetch(`http://localhost:8000/assets/${assetId}`, {
        method: "DELETE",
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