from sqlalchemy import Column, String, Float, DateTime
from datetime import datetime
import uuid

from .database import Base

class Report(Base):
    __tablename__ = "reports"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    category = Column(String, nullable=False)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    status = Column(String, default="NEW")
    created_at = Column(DateTime, default=datetime.utcnow)
