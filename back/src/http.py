from aiohttp import ClientSession

class HTTPClient():
    def __init__(self, base_url: str, api_key: str):
        self._session = ClientSession(
            base_url=base_url,
            headers={
                "accept": "application/json",
                "X-API-KEY": api_key
            }
        )

class CHTTPClient(HTTPClient):
    async def get_listings(self):
        async with self._session.get("/coins") as resp:
            result = await resp.json()
            return result["result"]
        
    async def get_currency(self, coinId: str):
        async with self._session.get(
            "/coins",
            params={"coinId": coinId}
            ) as resp:
            result = await resp.json()
            return result["result"][int(coinId)]
        
        