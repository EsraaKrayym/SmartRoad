from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from sqlalchemy import or_

from ..database import SessionLocal
from .. import models, schemas

router = APIRouter(prefix="/reports", tags=["Reports"])

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
                models.Report.title.ilike(f"%{q}%"),
                models.Report.description.ilike(f"%{q}%"),
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
def create_report(report: schemas.ReportCreate, db: Session = Depends(get_db)):
    db_report = models.Report(**report.dict())
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report
