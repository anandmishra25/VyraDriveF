from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from app.routers.auth import get_current_user, UserInDB

router = APIRouter(prefix="/earnings", tags=["earnings"])

@router.get("/stats")
async def get_earnings_stats(current_user: UserInDB = Depends(get_current_user)):
    return {
        "today": 2450,
        "this_week": 14500,
        "weekly_breakdown": [
            {"day": "Mon", "amount": 2100},
            {"day": "Tue", "amount": 2400},
            {"day": "Wed", "amount": 1800},
            {"day": "Thu", "amount": 2500},
            {"day": "Fri", "amount": 3200},
            {"day": "Sat", "amount": 2500},
            {"day": "Sun", "amount": 0},
        ],
        "payout_breakdown": [
            {"label": "Base Pay", "amount": 12000},
            {"label": "Incentives", "amount": 1500},
            {"label": "Surge Bonus", "amount": 800},
            {"label": "Tips", "amount": 200},
        ]
    }
