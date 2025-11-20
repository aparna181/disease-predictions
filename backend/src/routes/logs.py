from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Any

from src.db.db import DB
from src.utils.helpers import Helpers

router = APIRouter()

db = DB()
helpers = Helpers(db)

class UpdateStatus(BaseModel):
    id: str = Field(..., description="MongoDB document ID")
    value: str = Field(..., description="New status value")

class LogEntry(BaseModel):
    features: Dict[str, Any]
    predicted: Any
    status: str
    timestamp: str

@router.get("/get-logs", response_model=List[LogEntry])
def get_logs():
    return helpers.get_all_logs()


@router.post("/add-status")
def add_status(data: UpdateStatus):
    """
    Update the status of a prediction log.
    """
    try:
        result = helpers.update_status(data.id, data.value)
        if result["modified_count"] == 0:
            raise HTTPException(status_code=404, detail="Document not found or status already set")
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
