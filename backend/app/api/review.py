from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from app.database.session import get_db
from app.core.security import get_current_user
from app.schemas.review import ReviewResponse, ReviewCreate
from app.models.user import User
from app.services.review_service import ReviewService
router = APIRouter(
    prefix="/books",
    tags=["Reviews"]
)

@router.post("/{book_id}/review", 
        response_model=ReviewResponse)
def create_review(
    book_id: int,
    request: ReviewCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return ReviewService.create_review(
        db,
        user_id = user.id,
        book_id = book_id,
        content = request.content
    )
    
@router.get("/{book_id}/review",
            response_model=list[ReviewResponse])
def get_review(
    book_id:int,
    db:Session = Depends(get_db)
):
    return ReviewService.get_review_by_book(
        db,
        book_id = book_id
    )