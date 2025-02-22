from fastapi import APIRouter
from fastapi.responses import JSONResponse
from back.src.client import c_client

router_curr = APIRouter(
    prefix="/currencies"
)

@router_curr.get("/")
async def get_currencies():
    try:
        data = await c_client.get_listings()
        return JSONResponse(content=data)
    except Exception as e:
        return JSONResponse(
            content={"error": str(e)},
            status_code=500
        )

@router_curr.get("/{coinId}")
async def get_currency(coinId: str):
    return await c_client.get_currency(coinId)
