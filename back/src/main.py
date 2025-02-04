from fastapi import FastAPI
from back.src.router_curr import router_curr
from back.src.router_assets import router_assets
from fastapi.middleware.cors import CORSMiddleware
from back.src.database import init_db

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app = FastAPI()
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_curr)
app.include_router(router_assets)

