from fastapi import APIRouter, Depends, HTTPException
from back.src.assets import AssetBase, AssetModel
from back.src.client import get_asset_client
from back.src.database_hepler import AssetClient

router_assets = APIRouter(
    prefix="/assets"
)

@router_assets.get("/", response_model=list[AssetModel])
async def get_assets(asset_client: AssetClient = Depends(get_asset_client)):
    return await asset_client.get_all()

@router_assets.post("/", response_model=AssetModel)
async def add_asset(asset: AssetBase, asset_client: AssetClient = Depends(get_asset_client)):
    return await asset_client.create(asset_data=asset)

@router_assets.delete("/{asset_id}")
async def delete_asset(asset_id: int, asset_client: AssetClient = Depends(get_asset_client)):
    try:
        await asset_client.delete(asset_id)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))