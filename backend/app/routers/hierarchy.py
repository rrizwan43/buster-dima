from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..deps import get_db
from ..models import Asset

router = APIRouter(prefix="/hierarchy", tags=["Hierarchy"])

# @router.get("/")
# def get_hierarchy(db: Session = Depends(get_db)):
#     assets = db.query(Asset).all()
#     result = []

#     for asset in assets:
#         asset_node = {
#             "id": f"asset_{asset.asset_id}",
#             "name": asset.asset_code,
#             "type": "asset",
#             "children": []
#         }

#         for comp in asset.components:
#             comp_node = {
#                 "id": f"component_{comp.component_id}",
#                 "name": comp.component_name,
#                 "type": "component",
#                 "children": []
#             }

#             for fm in comp.failure_modes:
#                 fm_node = {
#                     "id": f"fm_{fm.failure_mode_id}",
#                     "name": fm.failure_mode,
#                     "type": "failure_mode",
#                     "children": []
#                 }

#                 for dm in fm.detection_maps:
#                     dm_node = {
#                         "id": f"dm_{dm.map_id}",
#                         "name": dm.indicators,
#                         "type": "detection",
#                         "children": []
#                     }

#                     if dm.cbm:
#                         dm_node["children"].append({
#                             "id": f"cbm_{dm.cbm.cbm_id}",
#                             "name": dm.cbm.method_name,
#                             "type": "cbm"
#                         })

#                     fm_node["children"].append(dm_node)

#                 comp_node["children"].append(fm_node)

#             asset_node["children"].append(comp_node)

#         result.append(asset_node)
@router.get("/assets")
def get_assets(db: Session = Depends(get_db)):
    assets = db.query(Asset).all()
    return [
        {
            "id": f"asset_{a.asset_id}",
            "name": a.asset_code,
            "type": "asset",
            "hasChildren": True
        }
        for a in assets
    ]
from ..models import Component

@router.get("/components")
def get_components(asset_id: int, db: Session = Depends(get_db)):
    comps = db.query(Component).filter(Component.asset_id == asset_id).all()
    return [
        {
            "id": f"component_{c.component_id}",
            "name": c.component_name,
            "type": "component",
            "hasChildren": True
        }
        for c in comps
    ]
from ..models import FailureMode

@router.get("/failure-modes")
def get_failure_modes(component_id: int, db: Session = Depends(get_db)):
    fms = db.query(FailureMode).filter(FailureMode.component_id == component_id).all()
    return [
        {
            "id": f"fm_{f.failure_mode_id}",
            "name": f.failure_mode,
            "type": "failure_mode",
            "hasChildren": True
        }
        for f in fms
    ]
from ..models import DetectionMap

@router.get("/detection-maps")
def get_detection_maps(failure_mode_id: int, db: Session = Depends(get_db)):
    maps = db.query(DetectionMap).filter(
        DetectionMap.failure_mode_id == failure_mode_id
    ).all()

    return [
        {
            "id": f"dm_{m.map_id}",
            "name": m.indicators,
            "type": "detection",
            "hasChildren": True
        }
        for m in maps
    ]
from ..models import CBMMethod

@router.get("/cbm-methods")
def get_cbm_methods(map_id: int, db: Session = Depends(get_db)):
    maps = db.query(DetectionMap).filter(
        DetectionMap.map_id == map_id
    ).all()

    result = []
    for m in maps:
        if m.cbm:
            result.append({
                "id": f"cbm_{m.cbm.cbm_id}",
                "name": m.cbm.method_name,
                "type": "cbm",
                "hasChildren": False
            })

    return result

    return {
    "id": "root",
    "name": "All Assets",
    "type": "root",
    "children": result
}

