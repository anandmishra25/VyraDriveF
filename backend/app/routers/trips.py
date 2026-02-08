from fastapi import APIRouter, Depends
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field
from app.core.database import db
from app.routers.auth import get_current_user, UserInDB
import uuid

router = APIRouter(prefix="/trips", tags=["trips"])

class Trip(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    date: datetime
    pickup: str
    dropoff: str
    fare: float
    distance: str
    duration: str
    status: str = "completed"

class TripCreate(BaseModel):
    pickup: str
    dropoff: str
    fare: float
    distance: str
    duration: str

@router.get("/", response_model=List[Trip])
async def get_trips(current_user: UserInDB = Depends(get_current_user)):
    trips = await db.get_db().trips.find({"user_id": current_user.id}).to_list(100)
    return trips

@router.post("/", response_model=Trip)
async def log_trip(trip: TripCreate, current_user: UserInDB = Depends(get_current_user)):
    new_trip = Trip(
        user_id=current_user.id,
        date=datetime.now(),
        **trip.model_dump()
    )
    await db.get_db().trips.insert_one(new_trip.model_dump())
    return new_trip

@router.get("/active")
async def get_active_request(current_user: UserInDB = Depends(get_current_user)):
    # Mock active trip request
    return {
        "id": "req_123",
        "pickup": "Terminal 2, Mumbai Airport",
        "dropoff": "Oberoi Mall, Goregaon",
        "fare": 450.0,
        "rating": 4.8,
        "distance": "12.5 km"
    }
