from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from app.database.session import get_db
from app.core.security import get_current_user
from app.schemas.rating import RatingResponse, RatingCreate
from app.models.user import User
from app.services.rating_service import RatingService

router = APIRouter(
    prefix="/books",
    tags=["Ratings"]
)

@router.post("/{book_id}/rating",
        response_model=  RatingResponse)
def create_rating(
    book_id: int,
    request: RatingCreate,
    user: User = Depends(get_current_user),
    db:Session = Depends(get_db) ):
    return RatingService.create_rating(
        db,
        user_id = user.id,
        book_id = book_id,
        u_rating = request.rating
    )
    
    
@router.get("/{book_id}/rating")
def get_user_rating(
    book_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return RatingService.get_user_rating(
        db,
        user.id,
        book_id
    )
    