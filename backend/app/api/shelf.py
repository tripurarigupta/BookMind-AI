from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from app.database.session import get_db
from app.core.security import get_current_user
from app.schemas.shelf import ShelfResponse, ShelfCreate, ShelfListResponse
from app.models.user import User
from app.services.shelf_service import ShelfService
from app.models.shelf import ShelfStatus
router = APIRouter(
    prefix="/shelf",
    tags=["Book Shelf"]
)

@router.post("/{book_id}",
             response_model=ShelfResponse)
def create_shelf(
    book_id: int,
    shelf: ShelfCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return ShelfService.create_shelf(
        db = db,
        user_id = user.id,
        book_id = book_id,
        status = shelf.status
    )
    
    
@router.get("/status/{status}",
            response_model=ShelfListResponse)
def get_books_by_status(
    status: ShelfStatus,
    page:int = 1,
    limit:int = 10,
    user:User = Depends(get_current_user),
    db:Session = Depends(get_db) 
):
    return ShelfService.get_books_by_shelf_status(
        db = db,
        user_id = user.id,
        status = status,
        page = page,
        limit = limit 
    )

@router.get("/{book_id}")
def get_book_shelf(
    book_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return ShelfService.get_book_shelf(
        db,
        current_user.id,
        book_id
    )

    
@router.delete("/{book_id}")
def delete_book_by_shelf(
    book_id:int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return ShelfService.delete_book_from_shelf(
        db = db,
        user_id= user.id,
        book_id= book_id
    )