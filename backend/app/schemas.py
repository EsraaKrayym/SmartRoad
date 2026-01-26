from pydantic import BaseModel
from datetime import datetime

class ReportOut(BaseModel):
    id: str
    address: str
    lat: float
    lng: float
    danger_level: str
    description: str | None
    image_url: str | None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
