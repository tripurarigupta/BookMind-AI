from sqlalchemy.orm import Session
from app.algorithms.content_based import ContentBasedRecommendationAlgorithm
from app.repositories.book_repository import BookRepository
from app.repositories.favorite_repository import FavoriteRepository
from app.repositories.rating_repository import RatingRepository
from app.algorithms.popular import PopularAlgorithm
from app.schemas.book import RecommendationType

class RecommendationService:

    @staticmethod
    def recommendation(db: Session, user_id: int):

        has_interactions = (
            RatingRepository.has_ratings(db, user_id)
            or FavoriteRepository.has_favorites(db, user_id)
        )

        if has_interactions:

            latest_rating = RatingRepository.get_latest_liked_book(db, user_id)
            print("lastest_rating_book id:", latest_rating.book_id)

            if latest_rating is None:
                return {
                    "type": RecommendationType.POPULAR,
                    "books": PopularAlgorithm.recommend(db, limit=20)
                }

            recommended_book_ids = ContentBasedRecommendationAlgorithm.recommend(
                latest_rating.book_id
            )

            if not recommended_book_ids:
                return {
                    "type": RecommendationType.POPULAR,
                    "books": PopularAlgorithm.recommend(db, limit=20)
                }

            books = BookRepository.get_books_by_ids(
                db,
                recommended_book_ids
            )

            book_map = {
                book.book_id: book
                for book in books
            }

            ordered_books = [
                book_map[book_id]
                for book_id in recommended_book_ids
                if book_id in book_map
            ]

            return {
                "type": RecommendationType.CONTENT_BASED,
                "books": ordered_books
            }

        return {
            "type": RecommendationType.POPULAR,
            "books": PopularAlgorithm.recommend(db, limit=20)
        }