from sqlalchemy import Column, String, Float, DateTime
from sqlalchemy.sql import func
import uuid
from app.database import Base

class Report(Base):
    __tablename__ = "reports"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    address = Column(String, nullable=False)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    danger_level = Column(String, nullable=False)
    description = Column(String)
    image_url = Column(String)
    status = Column(String, default="OPEN")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
