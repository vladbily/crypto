from sqlalchemy.orm import Session
from back.src.assets import AssetBase, AssetModel
from back.src.models import Asset

class DatabaseClient:
    def __init__(self, db_session: Session):
        self.db = db_session

class AssetClient(DatabaseClient):
    async def get_all(self) -> list[AssetModel]:
        assets = self.db.query(Asset).all()
        return [AssetModel.model_validate(asset) for asset in assets]
    
    async def create(self, asset_data: AssetBase) -> AssetModel:
        db_asset = Asset(**asset_data.model_dump())
        self.db.add(db_asset)
        self.db.commit()
        self.db.refresh(db_asset)
        return AssetModel.model_validate(db_asset)
    
    async def delete(self, asset_id: int) -> None:
        db_asset = self.db.query(Asset).filter(Asset.id == asset_id).first()
        if not db_asset:
            raise ValueError("Asset not found")
        try:
            self.db.delete(db_asset)
            self.db.commit()
        except Exception as e:
            self.db.rollback()
            raise e