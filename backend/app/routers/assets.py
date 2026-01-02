from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..deps import get_db
from ..models import Asset

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
# from ..database import get_db
from ..models import Asset, Component
from ..schemas import AssetUpdate
from ..deps import get_db



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

@router.put("/{asset_id}")
def update_asset(
    asset_id: int,
    payload: AssetUpdate,
    db: Session = Depends(get_db)
):
    asset = db.query(Asset).filter(Asset.asset_id == asset_id).first()

    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")

    for key, value in payload.dict(exclude_unset=True).items():
        setattr(asset, key, value)

    db.commit()
    db.refresh(asset)

    return asset
@router.delete("/{asset_id}")
def delete_asset(asset_id: int, db: Session = Depends(get_db)):
    asset = db.query(Asset).filter(Asset.asset_id == asset_id).first()

    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")

    # 🔐 SAFETY CHECK
    has_components = (
        db.query(Component)
        .filter(Component.asset_id == asset_id)
        .first()
    )

    if has_components:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete asset with existing components"
        )

    db.delete(asset)
    db.commit()

    return {"message": "Asset deleted successfully"}
