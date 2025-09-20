from datetime import datetime
from bson import ObjectId

def add_log(features, pred, collection):
    now = datetime.utcnow()
    result = collection.insert_one({
        "features": features,
        "predicted": pred,
        "status": "not_reviewed",
        "createdAt": now,
        "updatedAt": now
    })
    return result.inserted_id

def update_status(id, value, collection):
    res = collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": {"status": value}}
    )
    return {"msg": "Status Added Sucessfully"}

