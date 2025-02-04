from back.src.http import CHTTPClient
from back.src.config import settings
from back.src.database_hepler import AssetClient
from sqlalchemy.orm import Session
from fastapi import Depends
from back.src.database import get_db

c_client = CHTTPClient(
    base_url="https://openapiv1.coinstats.app",
    api_key= settings.API_KEY
)

async def get_asset_client(db: Session = Depends(get_db)):
    return AssetClient(db)