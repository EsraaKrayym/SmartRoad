from pydantic import BaseModel
from datetime import datetime

class ReportCreate(BaseModel):
    title: str
    description: str
    category: str
    lat: float
    lng: float

class ReportOut(BaseModel):
    id: str
    title: str
    description: str
    category: str
    lat: float
    lng: float
    status: str
    created_at: datetime

    class Config:
        orm_mode = True
