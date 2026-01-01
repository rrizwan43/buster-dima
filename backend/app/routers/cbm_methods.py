from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..deps import get_db
from ..models import CBMMethod

router = APIRouter(prefix="/cbm-methods", tags=["CBM Methods"])

@router.get("/")
def get_cbm_methods(db: Session = Depends(get_db)):
    return db.query(CBMMethod).all()

@router.post("/")
def create_cbm_method(data: dict, db: Session = Depends(get_db)):
    obj = CBMMethod(**data)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj
