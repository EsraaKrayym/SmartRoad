from pydantic import BaseModel
from datetime import datetime
from typing import Optional

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
    # 🔥 KI-Felder OPTIONAL
    ai_confidence: Optional[float] = None
    ai_box_width: Optional[int] = None
    ai_box_height: Optional[int] = None
    severity: Optional[str] = None

    class Config:
        from_attributes = True
