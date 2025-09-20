from pymongo import MongoClient
import os


MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("MONGO_DB", "disease_db")
COLLECTION_NAME = os.getenv("MONGO_COLLECTION", "predictions")

client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]