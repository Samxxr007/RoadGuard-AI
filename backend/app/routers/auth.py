from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from .. import schemas, models
from ..database import get_db

router = APIRouter(prefix="/auth", tags=["auth"])

# Dummy implementation for now to support frontend mock
@router.post("/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # In a real app, verify password hash
    # For now, accept demo credentials
    if form_data.username == "admin@roadguard.ai":
        return {"access_token": "mock-jwt-token-admin", "token_type": "bearer"}
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"},
    )
