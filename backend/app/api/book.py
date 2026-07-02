from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from app.schemas.book import BookListResponse, BookResponse, BookDetailResponse
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


@router.get("/search",
    response_model=list[BookResponse])
def get_by_title(
    title: str,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    return BookService.search_by_title(
        db = db,
        title = title,
        page = page,
        limit = limit
    )



@router.get("/{book_id}",
        response_model=BookDetailResponse)
def get_by_id(
    book_id: int,
    db: Session = Depends(get_db)
):
    return BookService.get_by_id(
        db = db,
        book_id = book_id
    )
    
