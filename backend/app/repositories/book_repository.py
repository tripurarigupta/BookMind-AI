from sqlalchemy import select, func
from sqlalchemy.orm import Session
from app.models.book import Book

class BookRepository:
    
    @staticmethod
    def get_books(db: Session, offset: int, limit: int):
        query=(
            select(Book).offset(offset).limit(limit)
        )
        result = db.execute(query).scalars().all()
        return result
    
    @staticmethod
    def get_by_id(db: Session, book_id):
        query = (
            select(Book).where(Book.book_id == book_id)
        )
        return db.execute(query).scalar_one_or_none()
    
    @staticmethod
    def search_books(db, title):
        pass
    
    @staticmethod
    def get_by_ids(db, ids):
        pass
    
    @staticmethod
    def count_books(db: Session):
        query = (
            select(func.count()).select_from(Book)
        )
        total_books = db.execute(query).scalar_one()
        return total_books