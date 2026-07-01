from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from app.schemas.book import BookListResponse, BookResponse
from app.database.session import get_db
from app.services.book_service import BookService


router = APIRouter(
    prefix="/books",
    tags=["Books"]
)

@router.get("/",
    response_model=BookListResponse)
def home(
    page: int= 1,
    limit: int= 10,
    db: Session = Depends(get_db)
):
    return BookService.get_books(
        db = db,
        page = page,
        limit = limit
    )

@router.get("/{book_id}",
        response_model=BookResponse)
def get_by_id(
    book_id: int,
    db: Session = Depends(get_db)
):
    return BookService.get_by_id(
        db = db,
        book_id = book_id
    )
