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
