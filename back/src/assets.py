from pydantic import BaseModel
from datetime import datetime

class AssetBase(BaseModel):
    name: str
    amount: float
    price: float
    date: datetime
    
class AssetModel(AssetBase):
    id: int
    
    class Config():
        from_attributes = True