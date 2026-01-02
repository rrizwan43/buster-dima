from pydantic import BaseModel
from typing import Optional

class AssetBase(BaseModel):
    asset_id: int
    asset_code: Optional[str] = None
    asset_type: Optional[str] = None
    process_area: Optional[str] = None
    description: Optional[str] = None

class AssetUpdate(BaseModel):
    asset_code: Optional[str] = None
    asset_type: Optional[str] = None
    process_area: Optional[str] = None
    description: Optional[str] = None
