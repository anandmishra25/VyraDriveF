from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.routers.auth import get_current_user, UserInDB

router = APIRouter(prefix="/profile", tags=["profile"])

class ProfileUpdate(BaseModel):
    phone: str
    vehicle_number: str

@router.get("/")
async def get_profile(current_user: UserInDB = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.full_name,
        "email": current_user.email,
        "fleet_owner": "Vikas Transport",
        "rating": 4.85,
        "days_active": 342,
        "vehicle_number": "MH 02 DN 4829",
        "vehicle_type": "Maruti WagonR CNG",
        "phone": "+91 98765 43210"
    }

@router.put("/")
async def update_profile(update: ProfileUpdate, current_user: UserInDB = Depends(get_current_user)):
    # Update logic would go here
    return {"message": "Profile updated"}
