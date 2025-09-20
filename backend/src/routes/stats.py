from fastapi import APIRouter
from db.db import collection

router = APIRouter()

@router.get("/stats")
def get_stats():
    correct = collection.count_documents({"status": "correct"})
    incorrect = collection.count_documents({"status": "incorrect"})
    not_reviewed = collection.count_documents({"status": "not_reviewed"})

    return {
        "correct": correct,
        "incorrect": incorrect,
        "notReviewed": not_reviewed
    }
