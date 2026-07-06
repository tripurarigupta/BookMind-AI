from sqlalchemy.orm import Session
from app.models.book import Book
import math
from app.repositories.book_repository import BookRepository
from app.schemas.book import(
    BookListResponse
)


class BookService:
    @staticmethod
    def get_books(db: Session, page: int, limit: int
    ):
        books = BookRepository.get_books(
            db,
            offset = ((page -1) * limit),
            limit = limit
        )
        total_books = BookRepository.count_books(db)
        
        return BookListResponse(
            page= page,
            limit= limit,
            total_books= total_books,
            total_pages= math.ceil(total_books/limit),
            books= books
        )
        
    # get by id
    @staticmethod
    def get_by_id(db: Session, book_id: int):
        return BookRepository.get_by_id(
            db,
            book_id=book_id
        )
        
    # search by title
    @staticmethod
    def search_by_title(db: Session, title: str, page: int, limit: int):
        return BookRepository.search_by_title(
            db, 
            title=title,
            offset=((page-1)*limit),
            limit= limit
        )
        
        