from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Header
from sqlalchemy.orm import Session
from typing import Optional
from sqlalchemy import or_
from pydantic import BaseModel
from ..database import SessionLocal
from .. import models, schemas
import shutil
import uuid
import os

router = APIRouter(prefix="/reports", tags=["reports"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


class StatusUpdate(BaseModel):
    status: str


def require_admin(x_role: str = Header(...)):
    if x_role != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin role required")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[schemas.ReportOut])
def get_reports(
        status: Optional[str] = None,
        q: Optional[str] = None,
        db: Session = Depends(get_db),
):
    query = db.query(models.Report)

    if status:
        query = query.filter(models.Report.status == status)

    if q:
        query = query.filter(
            or_(
                models.Report.description.ilike(f"%{q}%"),
                models.Report.address.ilike(f"%{q}%"),
            )
        )

    return query.all()


@router.get("/{report_id}", response_model=schemas.ReportOut)
def get_report(report_id: str, db: Session = Depends(get_db)):
    report = db.query(models.Report).filter(models.Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report


@router.post("/", response_model=schemas.ReportOut)
def create_report(
        address: str = Form(...),
        lat: float = Form(...),
        lng: float = Form(...),
        dangerLevel: str = Form(...),
        description: str = Form(""),
        image: UploadFile = File(None),
        db: Session = Depends(get_db),
):
    image_path = None

    if image:
        filename = f"{uuid.uuid4()}_{image.filename}"
        image_path = f"{UPLOAD_DIR}/{filename}"
        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

    report = models.Report(
        address=address,
        lat=lat,
        lng=lng,
        danger_level=dangerLevel,
        description=description,
        image_url=image_path,
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return report


@router.patch("/{report_id}/status", response_model=schemas.ReportOut)
def update_report_status(
        report_id: str,
        body: StatusUpdate,
        db: Session = Depends(get_db),
        _: None = Depends(require_admin),
):
    report = db.query(models.Report).filter(models.Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    report.status = body.status
    db.commit()
    db.refresh(report)

    return report
