from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from app.database.session import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.services.favorite_service import FavoriteService
from app.schemas.favorite import FavoriteResponse


router = APIRouter(
    prefix="/favorite_books",
    tags=["Favorite Books"]
)


@router.get("/",
            response_model=list[FavoriteResponse])
def get_favorite_books(
    current_user:User = Depends(get_current_user),
    db: Session = Depends(get_db),
    ):        
        return FavoriteService.get_favorite(
            db,
            user_id=current_user.id
        )


    

@router.post("/{book_id}")   
def add_favorite(
    book_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return FavoriteService.add_favorite(
        db, 
        user_id= current_user.id,
        book_id=book_id
    )
    
    
@router.delete("/{book_id}")
def delete(
    book_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return FavoriteService.delete_favorite(
        db,
        book_id = book_id,
        user_id = current_user.id
        
    )