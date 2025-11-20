from datetime import datetime
from bson import ObjectId
from src.db.db import DB


class Helpers:
    def __init__(self, db: DB):
        """
        Initialize Helpers with a DB instance.
        
        Args:
            db: An instance of your DB class.
        """
        client = db.get_client()
        self.collection = client[db.DB_NAME][db.COLLECTION_NAME]

    def add_log(self, features, pred) -> str:
        """Insert a prediction log into MongoDB."""
        try:
            log_entry = {
                "features": features,
                "predicted": pred,
                "status": "not_reviewed",
                "timestamp": datetime.utcnow()
            }
            result = self.collection.insert_one(log_entry)
            return str(result.inserted_id)
        except Exception as e:
            raise RuntimeError(f"Failed to insert log: {e}")

    def update_status(self, doc_id, status: str):
        """Update the review status of a prediction log."""
        try:
            if isinstance(doc_id, str):
                doc_id = ObjectId(doc_id)

            result = self.collection.update_one(
                {"_id": doc_id},
                {"$set": {"status": status}}
            )

            return {
                "matched_count": result.matched_count,
                "modified_count": result.modified_count,
                "msg": "Status updated successfully" if result.modified_count else "No document updated"
            }
        except Exception as e:
            raise RuntimeError(f"Failed to update status: {e}")

    def get_log(self, doc_id):
        """Fetch a single log by its ID."""
        try:
            if isinstance(doc_id, str):
                doc_id = ObjectId(doc_id)
            return self.collection.find_one({"_id": doc_id}) or {}
        except Exception as e:
            raise RuntimeError(f"Failed to fetch log: {e}")

    def get_all_logs(self) -> list:
        """Fetch multiple logs from MongoDB."""
        try:
            logs = list(self.collection.find().sort("timestamp", -1))
            formatted_logs = []
            for log in logs:
                formatted_logs.append({
                    "features": log.get("features", {}),
                    "predicted": log.get("predicted"),
                    "status": log.get("status", "not_reviewed"),
                    "timestamp": log.get("timestamp").isoformat() if log.get("timestamp") else None
                })
            return formatted_logs
        except Exception as e:
            raise RuntimeError(f"Failed to fetch logs: {e}")
