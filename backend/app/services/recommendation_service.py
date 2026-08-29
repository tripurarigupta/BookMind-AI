from sqlalchemy.orm import Session
from app.algorithms.content_based import ContentBasedRecommendationAlgorithm
from app.repositories.book_repository import BookRepository
from app.repositories.favorite_repository import FavoriteRepository
from app.repositories.rating_repository import RatingRepository
from app.algorithms.popular import PopularAlgorithm
from app.schemas.book import RecommendationType

class RecommendationService:

    @staticmethod
    def _get_content_based(db: Session, book_id: int):
        """Run content-based algorithm and return ordered books, or None."""
        recommended_book_ids = ContentBasedRecommendationAlgorithm.recommend(book_id)
        if not recommended_book_ids:
            return None

        books = BookRepository.get_books_by_ids(db, recommended_book_ids)
        book_map = {book.book_id: book for book in books}
        ordered_books = [
            book_map[bid] for bid in recommended_book_ids if bid in book_map
        ]
        return ordered_books if ordered_books else None

    @staticmethod
    def recommendation(db: Session, user_id: int):

        has_interactions = (
            RatingRepository.has_ratings(db, user_id)
            or FavoriteRepository.has_favorites(db, user_id)
        )

        if has_interactions:
            # Collect candidate book IDs from all user interactions
            rated_ids = RatingRepository.get_rated_book_ids(db, user_id, limit=10)
            favorites = FavoriteRepository.get_favorites(db, user_id)
            fav_ids = [f.book_id for f in favorites] if favorites else []

            # Merge: rated books first (most recent), then favorites, deduplicated
            seen = set()
            candidate_ids = []
            for bid in rated_ids + fav_ids:
                if bid not in seen:
                    seen.add(bid)
                    candidate_ids.append(bid)

            print(f"[Rec] user={user_id} rated={rated_ids} favs={fav_ids} candidates={candidate_ids}")

            # Try content-based from each candidate until one works
            for book_id in candidate_ids:
                result = RecommendationService._get_content_based(db, book_id)
                if result:
                    print(f"[Rec] content-based OK from book_id={book_id}, found {len(result)} books")
                    return {"type": RecommendationType.CONTENT_BASED, "books": result}

            print(f"[Rec] no content-based match, falling back to popular")

        # Fallback: popular books
        return {
            "type": RecommendationType.POPULAR,
            "books": PopularAlgorithm.recommend(db, limit=24)
        }