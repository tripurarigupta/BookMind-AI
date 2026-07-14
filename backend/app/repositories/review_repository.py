from sqlalchemy import select, exists, func
from sqlalchemy.orm import Session
from app.models.review import Review
from sqlalchemy.orm import joinedload

class ReviewRepository:
    
    @staticmethod
    def create_review(db: Session, user_id:int, book_id:int, content:str):
        review = Review(user_id = user_id, book_id = book_id, content = content)
        db.add(review)
        return review
    
    
    @staticmethod
    def get_review_by_user_and_book(db: Session, user_id: int, book_id:int):
        review = db.execute(select(Review).where(
            Review.book_id == book_id,
            Review.user_id == user_id)).scalar_one_or_none()
        return review
    
    
    @staticmethod
    def get_review_by_book(db: Session, book_id: int):
        query = (
            select(Review)
            .options(joinedload(Review.user))
            .where(Review.book_id == book_id)
            .order_by(Review.updated_at.desc())
        )

        return db.execute(query).scalars().all()
    
    
    @staticmethod
    def has_reviews(db: Session, user_id):
        return db.scalar(select(exists().where(Review.user_id == user_id)))
    
    
    @staticmethod
    def get_my_review(
        db: Session,
        user_id: int,
        book_id: int
    ):
        return (
            db.execute(
                select(Review).where(
                    Review.user_id == user_id,
                    Review.book_id == book_id
                )
            ).scalar_one_or_none()
        )
        
    @staticmethod
    def count_by_user(db: Session, user_id: int):
        return db.execute(
            select(func.count())
            .select_from(Review)
            .where(Review.user_id == user_id)
        ).scalar_one()