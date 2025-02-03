from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from back.src.assets import AssetBase, AssetModel
from back.src.database import db_dependency, get_db
from back.src.models import Asset

router_assets = APIRouter(
    prefix="/assets"
)

@router_assets.get("/", response_model=list[AssetModel])
def get_assets(db: Session = Depends(get_db)):
    return db.query(Asset).all()

@router_assets.post("/", response_model=AssetModel)
async def add_asset(asset: AssetBase, db: db_dependency):
    db_asset = Asset(**asset.model_dump())
    db.add(db_asset)
    db.commit()
    db.refresh(db_asset)
    return db_asset