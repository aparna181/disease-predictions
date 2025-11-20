from dotenv import load_dotenv
load_dotenv()

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import predict_route, logs, stats

app = FastAPI(title="Disease Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_route.router, tags=["Prediction"])
app.include_router(stats.router, tags=["Stats"])
app.include_router(logs.router, tags=["Logs"])

if __name__ == "__main__":
    uvicorn.run("src.app:app", host="0.0.0.0", port=5000, reload=False)
    # uvicorn.run("src.app:app", host="localhost", port=5000, reload=True)