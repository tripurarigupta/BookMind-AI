from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from app.database.session import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.book import RecommendationResponse
from app.services.recommendation_service import RecommendationService

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommandation"]
)

@router.get("/",
        response_model=RecommendationResponse)
def recommendation(user:User = Depends(get_current_user),
        db: Session = Depends(get_db)):
    return RecommendationService.recommendation(db, user_id = user.id)
