from fastapi import APIRouter, Depends
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field
from app.core.database import db
from app.routers.auth import get_current_user, UserInDB
import uuid

router = APIRouter(prefix="/expenses", tags=["expenses"])

class FuelLog(BaseModel):
    amount: float
    cng_kg: float
    odometer: int

class Expense(BaseModel):
    type: str # toll, parking, repair
    description: str
    amount: float
    date: datetime = Field(default_factory=datetime.now)

@router.post("/fuel")
async def log_fuel(log: FuelLog, current_user: UserInDB = Depends(get_current_user)):
    doc = log.model_dump()
    doc["user_id"] = current_user.id
    doc["date"] = datetime.now()
    doc["efficiency"] = 22.4 # Mock calc
    await db.get_db().fuel_logs.insert_one(doc)
    return {"message": "Fuel log saved", "efficiency": 22.4}

@router.get("/fuel")
async def get_fuel_logs(current_user: UserInDB = Depends(get_current_user)):
    logs = await db.get_db().fuel_logs.find({"user_id": current_user.id}).to_list(100)
    return logs

@router.post("/other")
async def log_expense(expense: Expense, current_user: UserInDB = Depends(get_current_user)):
    doc = expense.model_dump()
    doc["user_id"] = current_user.id
    await db.get_db().expenses.insert_one(doc)
    return {"message": "Expense saved"}

@router.get("/other")
async def get_expenses(current_user: UserInDB = Depends(get_current_user)):
    expenses = await db.get_db().expenses.find({"user_id": current_user.id}).to_list(100)
    return expenses
