from pydantic import ValidationError
from sqlalchemy.orm import Session
from back.src.assets import AssetBase, AssetModel
from back.src.models import Asset
from datetime import datetime

class DatabaseClient:
    def __init__(self, db_session: Session):
        self.db = db_session

class AssetClient(DatabaseClient):
    async def get_all(self) -> list[AssetModel]:
        assets = self.db.query(Asset).all()
        valid_assets = []
        invalid_assets = []

        for asset in assets:
            try:
                valid_assets.append(AssetModel.model_validate(asset))
            except ValidationError as e:
                invalid_assets.append(f"Asset ID {asset.id} is invalid: {e.errors()}")
        if invalid_assets:
            raise ValueError("There are invalid assets in the database. Please fix them before proceeding.")

        return valid_assets
    async def create(self, asset_data: AssetBase) -> AssetModel:
        if asset_data.amount > 0 and asset_data.date is datetime:
            db_asset = Asset(**asset_data.model_dump())
            self.db.add(db_asset)
            self.db.commit()
            self.db.refresh(db_asset)
            return AssetModel.model_validate(db_asset)
        elif asset_data.date is datetime:
            db_asset = Asset(**asset_data.model_dump())
            self.db.add(db_asset)
            self.db.commit()
            self.db.refresh(db_asset)
            return AssetModel.model_validate(db_asset)
            
        else:
            raise ValueError("Something went wrong")
    
    async def delete(self, asset_name: str) -> None:
        db_assets = self.db.query(Asset).filter(Asset.name == asset_name).all()
        if not db_assets:
            raise ValueError("Asset not found")
        try:
            for db_asset in db_assets:
                self.db.delete(db_asset)
            self.db.commit()
        except Exception as e:
            self.db.rollback()
            raise e