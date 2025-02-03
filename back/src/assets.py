from pydantic import BaseModel

class AssetBase(BaseModel):
    name: str
    amount: float
    price: float
    date: str
    
class AssetModel(AssetBase):
    id: int
    
    class Config():
        orm_mode = True