import asyncio
from fastapi import FastAPI
from back.src.router_curr import router_curr
from back.src.router_assets import router_assets
from fastapi.middleware.cors import CORSMiddleware
from back.src.database import init_db
from back.src.bot import start_bot

origins = [
    "https://a2b186b79dd70422731cab3c661a95b0.serveo.net",
    "https://bebrasechka1.loca.lt",
]

app = FastAPI()
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

@app.on_event("startup")
async def startup():
    asyncio.create_task(start_bot())
    
app.include_router(router_curr)
app.include_router(router_assets)

