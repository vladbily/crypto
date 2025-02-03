from sqlalchemy import Integer, String, Float, Column
from back.src.database import Base

class Asset(Base):
    __tablename__ = "assets"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    amount = Column(Float)
    price = Column(Float)
    date = Column(String)
    
    
    