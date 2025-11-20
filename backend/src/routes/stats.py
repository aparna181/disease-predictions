from fastapi import APIRouter, Depends
from src.db.db import DB

router = APIRouter()
db = DB()

@router.get("/stats")
def get_stats(collection=Depends(db.get_collection)):
    correct = collection.count_documents({"status": "correct"})
    incorrect = collection.count_documents({"status": "incorrect"})
    not_reviewed = collection.count_documents({"status": "not_reviewed"})

    return {
        "correct": correct,
        "incorrect": incorrect,
        "notReviewed": not_reviewed
    }
