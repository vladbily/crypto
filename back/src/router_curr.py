from fastapi import APIRouter
from back.src.client import c_client

router_curr = APIRouter(
    prefix="/currencies"
)

@router_curr.get("/")
async def get_currencies():
    return await c_client.get_listings()

@router_curr.get("/{coinId}")
async def get_currency(coinId: str):
    return await c_client.get_currency(coinId)
