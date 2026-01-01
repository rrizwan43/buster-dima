from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..deps import get_db
from ..models import DetectionMap

router = APIRouter(prefix="/detection-map", tags=["Detection Map"])

@router.get("/")
def get_detection_map(db: Session = Depends(get_db)):
    return db.query(DetectionMap).all()

@router.post("/")
def create_detection_map(data: dict, db: Session = Depends(get_db)):
    obj = DetectionMap(**data)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj
