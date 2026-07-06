from sqlalchemy import select, func
from sqlalchemy.orm import Session
from app.models.rating import Rating
from app.models.book import Book

class RatingRepository:
    
    @staticmethod
    def create_rating(db, user_id, book_id, rating):
        new_rating = Rating( user_id=user_id, book_id=book_id, rating=rating )
        db.add(new_rating)
        return new_rating
    
        
    @staticmethod
    def get_rating_by_id():
        pass

    @staticmethod
    def get_rating_by_user_and_book(db: Session, user_id:int, book_id:int):
        rating =  db.execute(select(Rating).where(
            Rating.user_id == user_id, Rating.book_id == book_id)).scalar_one_or_none()
        return rating

    
    
    @staticmethod
    def delete_rating():
        pass
