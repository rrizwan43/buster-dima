from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..deps import get_db
from ..models import Component

router = APIRouter(prefix="/components", tags=["Components"])

@router.get("/")
def get_components(db: Session = Depends(get_db)):
    return db.query(Component).all()

@router.post("/")
def create_component(component: dict, db: Session = Depends(get_db)):
    obj = Component(**component)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj
