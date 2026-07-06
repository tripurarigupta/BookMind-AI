from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.rating_repository import RatingRepository
from app.repositories.book_repository import BookRepository

class RatingService:
    
    @staticmethod
    def create_rating(db: Session, user_id: int, book_id:int, u_rating: int):
        book = BookRepository.get_by_id(db, book_id=book_id)
        if not book:
            raise HTTPException(
        status_code=404,
        detail="Book not found"
            )
        current_average = book.average_rating
        current_count = book.ratings_count
        rating = RatingRepository.get_rating_by_user_and_book(db, user_id, book_id)
        if rating:
            old_rating = rating.rating
            rating.rating = u_rating
            new_average =((current_average* current_count)-old_rating + u_rating)/ current_count
            book.average_rating = new_average
        else:
            rating = RatingRepository.create_rating(db, user_id, book_id, u_rating)
            new_average = ((current_average * current_count) + u_rating)/(current_count+1)
            book.average_rating = new_average
            book.ratings_count += 1
        db.commit()
        return rating
    
            
    
    @staticmethod
    def get_rating_by_user_and_book(db: Session, user_id:int):
        pass

        
    @staticmethod
    def update_rating():
        pass
    
    
    @staticmethod
    def delete_rating():
        pass
    
    
    @staticmethod
    def get_rating():
        pass