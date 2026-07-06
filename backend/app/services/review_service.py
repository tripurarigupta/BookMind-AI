from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.review_repository import ReviewRepository
from app.repositories.book_repository import BookRepository

class ReviewService:
    
    @staticmethod
    def create_review(db:Session, user_id:int, book_id:int, content:str):
        book = BookRepository.get_by_id(db, book_id= book_id)
        if not book:
            raise HTTPException(
        status_code=404,
        detail="Book not found"
            )
        review = ReviewRepository.get_review_by_user_and_book(db, user_id, book_id)
        
        if review:
            if review.content != content:
                review.content = content
        else:
            review = ReviewRepository.create_review(db, user_id, book_id, content)
            
        db.commit()
        db.refresh(review)
        return review
        
    
    @staticmethod
    def get_review_by_book(db: Session, book_id:int):
        return ReviewRepository.get_review_by_book(
            db,
            book_id
            )