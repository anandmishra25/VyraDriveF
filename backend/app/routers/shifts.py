from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field
from app.core.database import db
from app.routers.auth import get_current_user, UserInDB
import uuid

router = APIRouter(prefix="/shifts", tags=["shifts"])

# Models
class ShiftStart(BaseModel):
    location: str
    vehicle_id: str

class HandoverChecklist(BaseModel):
    vehicle_clean: bool
    fuel_level: str
    documents_checked: bool
    notes: Optional[str] = None

class CorporateDuty(BaseModel):
    id: str
    company: str
    time: str
    route: str
    status: str

class Shift(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    start_time: datetime = Field(default_factory=datetime.now)
    end_time: Optional[datetime] = None
    start_location: str
    vehicle_id: str
    status: str = "active" # active, completed
    earnings: float = 0.0

@router.post("/start", response_model=Shift)
async def start_shift(shift_data: ShiftStart, current_user: UserInDB = Depends(get_current_user)):
    # Check if active shift exists
    active = await db.get_db().shifts.find_one({"user_id": current_user.id, "status": "active"})
    if active:
        raise HTTPException(status_code=400, detail="Shift already active")

    new_shift = Shift(
        user_id=current_user.id,
        start_location=shift_data.location,
        vehicle_id=shift_data.vehicle_id
    )
    await db.get_db().shifts.insert_one(new_shift.model_dump())
    return new_shift

@router.post("/end")
async def end_shift(current_user: UserInDB = Depends(get_current_user)):
    active = await db.get_db().shifts.find_one({"user_id": current_user.id, "status": "active"})
    if not active:
        raise HTTPException(status_code=400, detail="No active shift")
    
    await db.get_db().shifts.update_one(
        {"_id": active["_id"]},
        {"$set": {"status": "completed", "end_time": datetime.now()}}
    )
    return {"message": "Shift ended"}

@router.get("/history", response_model=List[Shift])
async def get_shift_history(current_user: UserInDB = Depends(get_current_user)):
    shifts = await db.get_db().shifts.find({"user_id": current_user.id}).to_list(100)
    return shifts

@router.post("/handover")
async def submit_handover(checklist: HandoverChecklist, current_user: UserInDB = Depends(get_current_user)):
    doc = checklist.model_dump()
    doc["user_id"] = current_user.id
    doc["timestamp"] = datetime.now()
    await db.get_db().handovers.insert_one(doc)
    return {"message": "Handover checklist submitted"}

@router.get("/corporate", response_model=List[CorporateDuty])
async def get_corporate_duties(current_user: UserInDB = Depends(get_current_user)):
    # Mock data for now
    return [
        CorporateDuty(id="1", company="Tech Corp", time="08:00 AM", route="Andheri to Powai", status="completed"),
        CorporateDuty(id="2", company="FinSafe", time="06:00 PM", route="BKC to Thane", status="upcoming"),
    ]
