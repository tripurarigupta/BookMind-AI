from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.security import get_current_user
from app.database.session import get_db
from app.schemas.user import UserCreate, UserResponse, UserLogin, ProfileResponse
from app.schemas.token import Token
from app.services.auth_service import AuthService
from app.models.user import User

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def register(
    user_data: UserCreate,
    db: Session = Depends(get_db),
):
    try:
        return AuthService.register_user(
            db=db,
            user_data=user_data,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post(
    "/login",
    response_model=Token,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    try:
        login_data=UserLogin(
            identifier = form_data.username,
            password = form_data.password,)
        token = AuthService.login_user(
            db=db,
            login_data=login_data,
        )

        return {
            "access_token": token,
            "token_type": "bearer",
        }

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )
        
@router.get("/me", response_model=UserResponse)
def me(current_user = Depends(get_current_user)):
    return current_user
    
@router.get(
    "/profile",
    response_model=ProfileResponse
)
def profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return AuthService.get_profile(
        db=db,
        user=current_user
    )