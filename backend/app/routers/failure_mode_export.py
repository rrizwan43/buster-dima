from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..deps import get_db
from ..models import FailureModeExport

router = APIRouter(prefix="/failure-mode-export", tags=["Failure Mode Export"])

@router.get("/")
def get_all(db: Session = Depends(get_db)):
    return db.query(FailureModeExport).all()

@router.post("/")
def create(data: dict, db: Session = Depends(get_db)):
    obj = FailureModeExport(**data)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj
