from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import get_settings
from app.core.database import db
from app.routers import auth, dashboard, shifts, trips, earnings, expenses, safety, profile

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    db.connect()
    yield
    # Shutdown
    db.disconnect()

settings = get_settings()
app = FastAPI(title=settings.APP_NAME, lifespan=lifespan)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(dashboard.router)
app.include_router(shifts.router)
app.include_router(trips.router)
app.include_router(earnings.router)
app.include_router(expenses.router)
app.include_router(safety.router)
app.include_router(profile.router)

@app.get("/")
def root():
    return {"message": "Welcome to Vyra Drive API"}
