from pydantic import BaseModel, Field
from datetime import datetime

class AssetBase(BaseModel):
    name: str = Field(default="Undefined", min_length=3, max_length=20)    
    amount: float = Field(default=0, gt=0)
    price: float = Field(default=0, gt=0)
    date: datetime
    
class AssetModel(AssetBase):
    id: int
    
    class Config():
        from_attributes = True