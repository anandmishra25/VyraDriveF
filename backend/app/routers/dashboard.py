from fastapi import APIRouter, Depends
from app.routers.auth import get_current_user, UserInDB
from app.core.database import db

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/summary")
async def get_dashboard_summary(current_user: UserInDB = Depends(get_current_user)):
    # Fetch active shift
    active_shift = await db.get_db().shifts.find_one({"user_id": current_user.id, "status": "active"})
    
    # Calculate today's earnings (mock calculation)
    today_earnings = 0
    # In real app, query trips for today and sum fares
    
    return {
        "shift_active": bool(active_shift),
        "shift_start_time": active_shift["start_time"] if active_shift else None,
        "today_earnings": 2450.0, # Mock
        "trips_today": 12,
        "online_hours": 6.5
    }
