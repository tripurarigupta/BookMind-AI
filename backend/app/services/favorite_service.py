from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.favorite_repository import FavoriteRepository


class FavoriteService:
    
    @staticmethod
    def add_favorite(db: Session, user_id: int, book_id: int):
        if FavoriteRepository.exists(
            db,
            user_id=user_id,
            book_id=book_id
        ):
            raise HTTPException(
            status_code=400,
            detail="Book is already in favorites."
            )
        favorite = FavoriteRepository.add_favorite(
        db,
        user_id=user_id,
        book_id=book_id
        )
        return favorite
    
    
    @staticmethod
    def get_favorite(
        db: Session,
        user_id: int
    ):
        favorites = FavoriteRepository.get_favorites(
            db,
            user_id
        )
        return favorites
    
    
    @staticmethod
    def delete_favorite(
        db: Session,
        book_id: int,
        user_id: int        
    ):
        favorite = FavoriteRepository.delete_favorite(
            db,
            book_id,
            user_id
        )
        return favorite