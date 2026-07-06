from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.review import Review
from app.models.book import Book

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
    def get_review_by_book(db:Session, book_id:int):
        query = (
            select(Review).where(Review.book_id == book_id))
        review = db.execute(query).scalars().all()
        return review