from sqlalchemy import select, func, delete
from sqlalchemy.orm import Session, selectinload
from app.models.shelf import Shelf, ShelfStatus

class ShelfRepository:
    
    @staticmethod
    def create_shelf(db: Session, user_id:int, book_id:int, status:ShelfStatus):
        shelf = Shelf(user_id = user_id, book_id = book_id, status = status)
        db.add(shelf)
        return shelf
    

    @staticmethod
    def get_by_user_and_book(db: Session, user_id:int, book_id:int):
        return db.execute(select(Shelf).where(Shelf.user_id == user_id, Shelf.book_id == book_id)).scalar_one_or_none()
    

    @staticmethod
    def get_books_by_status(db: Session, user_id:int, status:ShelfStatus, offset:int, limit:int):
        query = (
            select(Shelf)
            .options(selectinload(Shelf.book))
            .where(
                Shelf.user_id == user_id,
                Shelf.status == status
            )
            .order_by(Shelf.updated_at.desc())
            .offset(offset)
            .limit(limit)
        )
        return db.execute(query).scalars().all()
    

    @staticmethod
    def count_books_by_status(db: Session, user_id:int, status:ShelfStatus):
        return db.execute(select(func.count()).select_from(Shelf).where(Shelf.user_id == user_id, Shelf.status == status)).scalar_one()
    

    @staticmethod
    def delete_book_from_shelf(db: Session, user_id:int, book_id:int):
        db.execute(delete(Shelf).where(Shelf.user_id == user_id, Shelf.book_id == book_id))
        
        
    @staticmethod
    def get_user_shelf(db: Session, user_id: int, book_id: int):
        return (
            db.execute(
                select(Shelf).where(
                    Shelf.user_id == user_id,
                    Shelf.book_id == book_id
                )
            ).scalar_one_or_none()
        )
        
    @staticmethod
    def count_by_user(db: Session, user_id: int):
        return db.execute(
            select(func.count())
            .select_from(Shelf)
            .where(Shelf.user_id == user_id)
        ).scalar_one()