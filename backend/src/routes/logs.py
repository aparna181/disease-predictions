from fastapi import APIRouter
from pydantic import BaseModel
from bson import ObjectId

from db.db import collection
from utils.helpers import update_status

router = APIRouter()

class UpdateStatus(BaseModel):
    id: str
    value: str

@router.get("/get-logs")
def get_logs():
    logs = []
    for log in collection.find().sort("timestamp", -1):
        logs.append({
            "id": str(log["_id"]),
            "features": log.get("features", []),
            "predicted": log.get("predicted"),
            "status": log.get("status", "not_reviewed"),
            "timestamp": log.get("timestamp")
        })
    return {"logs": logs}

@router.post("/add-status")
def add_status(data: UpdateStatus):
    return update_status(data.id, data.value, collection)
