from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..deps import get_db
from ..models import FailureMode

router = APIRouter(prefix="/failure-modes", tags=["Failure Modes"])

@router.get("/")
def get_failure_modes(db: Session = Depends(get_db)):
    return db.query(FailureMode).all()

@router.post("/")
def create_failure_mode(fm: dict, db: Session = Depends(get_db)):
    obj = FailureMode(**fm)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj
