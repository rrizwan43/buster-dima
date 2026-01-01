from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..deps import get_db
from ..models import Asset

router = APIRouter(prefix="/assets", tags=["Assets"])

@router.get("/")
def get_assets(db: Session = Depends(get_db)):
    return db.query(Asset).all()

@router.post("/")
def create_asset(asset: dict, db: Session = Depends(get_db)):
    obj = Asset(**asset)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj
