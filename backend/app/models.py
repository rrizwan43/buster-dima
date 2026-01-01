from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base

# 1️⃣ ASSETS
class Asset(Base):
    __tablename__ = "assets"

    asset_id = Column(Integer, primary_key=True, index=True)
    asset_code = Column(String)
    asset_type = Column(String)
    process_area = Column(String)
    description = Column(Text)

    components = relationship("Component", back_populates="asset")


# 2️⃣ CBM METHODS
class CBMMethod(Base):
    __tablename__ = "cbm_methods"

    cbm_id = Column(Integer, primary_key=True, index=True)
    cbm_code = Column(String)
    method_name = Column(String)
    description = Column(Text)
    cbm_notes = Column(Text)

    detection_maps = relationship("DetectionMap", back_populates="cbm")


# 3️⃣ COMPONENTS
class Component(Base):
    __tablename__ = "components"

    component_id = Column(Integer, primary_key=True, index=True)
    asset_id = Column(Integer, ForeignKey("assets.asset_id"))
    component_name = Column(String)
    component_type = Column(String)
    description = Column(Text)

    asset = relationship("Asset", back_populates="components")
    failure_modes = relationship("FailureMode", back_populates="component")


# 4️⃣ FAILURE MODES (MAIN)
class FailureMode(Base):
    __tablename__ = "failure_modes"

    failure_mode_id = Column(Integer, primary_key=True, index=True)
    component_id = Column(Integer, ForeignKey("components.component_id"))
    failure_mode = Column(String)
    mechanism = Column(Text)
    cause = Column(Text)
    effect = Column(Text)
    pf_interval_note = Column(Text)

    component = relationship("Component", back_populates="failure_modes")
    detection_maps = relationship("DetectionMap", back_populates="failure_mode")


# 5️⃣ DETECTION MAP
class DetectionMap(Base):
    __tablename__ = "detection_map"

    map_id = Column(Integer, primary_key=True, index=True)
    failure_mode_id = Column(Integer, ForeignKey("failure_modes.failure_mode_id"))
    cbm_id = Column(Integer, ForeignKey("cbm_methods.cbm_id"))
    indicators = Column(Text)

    failure_mode = relationship("FailureMode", back_populates="detection_maps")
    cbm = relationship("CBMMethod", back_populates="detection_maps")


# 6️⃣ FAILURE MODE EXPORT (COPY / VIEW TABLE)
class FailureModeExport(Base):
    __tablename__ = "failure_mode_export"

    failure_mode_id = Column(Integer, primary_key=True)
    component_id = Column(Integer)
    failure_mode = Column(String)
    mechanism = Column(Text)
    cause = Column(Text)
    effect = Column(Text)
    pf_interval_note = Column(Text)
