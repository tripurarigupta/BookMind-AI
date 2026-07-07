from sqlalchemy.orm import Session
from app.repositories.favorite_repository import FavoriteRepository
from app.repositories.rating_repository import RatingRepository
from app.algorithms.popular import PopularAlgorithm
from app.schemas.book import RecommendationType

class RecommandationService:
    
    @staticmethod
    def recommandation(db: Session, user_id:int):
        has_interactions = (
            RatingRepository.has_ratings(db, user_id = user_id)
            or FavoriteRepository.has_favorites(db, user_id =user_id)
        )

        if has_interactions:
            raise NotImplementedError
        else:
            popular_books = PopularAlgorithm.recommend(db, limit=20)
        return {"type": RecommendationType.POPULAR,
    "books": popular_books}
            