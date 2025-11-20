from pymongo import MongoClient
import os

class DB:
    def __init__(self):
        self.MONGODB_URI = os.getenv("MONGODB_URI")
        self.DB_NAME = os.getenv("MONGO_DB", "disease_db")
        self.COLLECTION_NAME = os.getenv("MONGO_COLLECTION", "predictions")

    def get_client(self):
        return MongoClient(self.MONGODB_URI)

    def get_db(self):
        client = self.get_client()
        return client[self.DB_NAME]

    def get_collection(self):
        db = self.get_db()
        collection = db[self.COLLECTION_NAME]
        yield collection
