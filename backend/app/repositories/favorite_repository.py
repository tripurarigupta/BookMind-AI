from sqlalchemy import select, exists
from sqlalchemy.orm import Session, joinedload
from app.models.favorite_books import FavoriteBook
from fastapi import HTTPException

class FavoriteRepository:

    @staticmethod
    def add_favorite(db: Session, user_id: int, book_id: int):
        favorite = FavoriteBook(
            user_id = user_id,
            book_id = book_id
        )
        db.add(favorite)
        db.commit()
        db.refresh(favorite)
        return favorite
        
    
    @staticmethod
    def exists(db: Session, user_id: int, book_id: int):
        result = (
            db.execute(select(FavoriteBook).where(FavoriteBook.book_id == book_id, FavoriteBook.user_id == user_id))
        ).scalar_one_or_none()
        return result is not None
    
    @staticmethod
    def get_favorites(db: Session, user_id: int):
        result = db.execute(select(FavoriteBook).options(joinedload(FavoriteBook.book))
                            .where(FavoriteBook.user_id==user_id)).scalars().all()
        return result


    @staticmethod
    def delete_favorite(db: Session,book_id: int, user_id:int ):
        favorite = db.execute(
            select(FavoriteBook).where(
                FavoriteBook.book_id == book_id,
                FavoriteBook.user_id == user_id
            )).scalar_one_or_none()
        if favorite is None:
            raise HTTPException(
                status_code=404,
                detail="Favorite not found."
            )

        db.delete(favorite)
        db.commit()

        return favorite
    
    @staticmethod
    def has_favorites(db: Session, user_id):
        return db.scalar(select(exists().where(FavoriteBook.user_id == user_id)))