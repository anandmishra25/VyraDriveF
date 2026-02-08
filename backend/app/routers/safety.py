from fastapi import APIRouter, Depends
from typing import List
from datetime import datetime
from pydantic import BaseModel
from app.core.database import db
from app.routers.auth import get_current_user, UserInDB

router = APIRouter(prefix="/safety", tags=["safety"])

class CheckIn(BaseModel):
    location: str
    status: str = "safe"

@router.post("/sos")
async def trigger_sos(current_user: UserInDB = Depends(get_current_user)):
    # In real app: Notify admin, send SMS, etc.
    event = {
        "user_id": current_user.id,
        "type": "SOS",
        "timestamp": datetime.now(),
        "status": "active"
    }
    await db.get_db().safety_events.insert_one(event)
    return {"message": "SOS Triggered", "status": "broadcasting"}

@router.get("/checkins")
async def get_checkins(current_user: UserInDB = Depends(get_current_user)):
    # Mock data
    return [
        {"id": 1, "time": "08:00 AM", "status": "completed"},
        {"id": 2, "time": "10:00 AM", "status": "completed"},
        {"id": 3, "time": "12:00 PM", "status": "due"},
    ]

@router.post("/checkin")
async def submit_checkin(checkin: CheckIn, current_user: UserInDB = Depends(get_current_user)):
    doc = checkin.model_dump()
    doc["user_id"] = current_user.id
    doc["timestamp"] = datetime.now()
    await db.get_db().checkins.insert_one(doc)
    return {"message": "Check-in successful"}
