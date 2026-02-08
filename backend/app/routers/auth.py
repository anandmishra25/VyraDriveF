from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.core.security import create_access_token, get_password_hash, verify_password, settings
from app.core.database import db
from app.models.user import UserCreate, User, UserInDB, Token, TokenData, UserBase
from jose import JWTError, jwt
from datetime import timedelta
from typing import Annotated
import uuid

router = APIRouter(prefix="/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        is_guest: bool = payload.get("is_guest", False)
        if user_id is None:
            raise credentials_exception
        token_data = TokenData(user_id=user_id, is_guest=is_guest)
    except JWTError:
        raise credentials_exception
        
    if token_data.is_guest:
        # Return a transient guest user object
        return UserInDB(id=token_data.user_id, is_guest=True, email="guest@vyra.com", full_name="Guest User")

    user_doc = await db.get_db().users.find_one({"id": token_data.user_id})
    if user_doc is None:
        raise credentials_exception
    return UserInDB(**user_doc)

@router.post("/signup", response_model=User)
async def signup(user: UserCreate):
    if await db.get_db().users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    user_in_db = UserInDB(
        **user.model_dump(exclude={"password"}),
        hashed_password=hashed_password
    )
    
    await db.get_db().users.insert_one(user_in_db.model_dump())
    return user_in_db

@router.post("/login", response_model=Token)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user_doc = await db.get_db().users.find_one({"email": form_data.username})
    if not user_doc or not verify_password(form_data.password, user_doc['hashed_password']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_doc['id'], "is_guest": False}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/guest", response_model=Token)
async def guest_login():
    """Generates a token for a guest user without credentials."""
    guest_id = str(uuid.uuid4())
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": guest_id, "is_guest": True}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=User)
async def read_users_me(current_user: Annotated[UserInDB, Depends(get_current_user)]):
    return current_user
