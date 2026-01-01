from .routers import hierarchy
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from .database import Base, engine
from .routers import (
    assets,
    components,
    failure_modes,
    cbm_methods,
    detection_map,
    failure_mode_export
)

app = FastAPI(title="BUSTER DIMA")

Base.metadata.create_all(bind=engine)

app.include_router(assets.router)
app.include_router(components.router)
app.include_router(failure_modes.router)
app.include_router(cbm_methods.router)
app.include_router(detection_map.router)
app.include_router(failure_mode_export.router)
app.include_router(hierarchy.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "API running"}
