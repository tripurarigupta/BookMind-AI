import math
from sqlalchemy.orm import Session
from app.repositories.book_repository import BookRepository
from app.schemas.book import BookListResponse


class BookService:

    @staticmethod
    def get_books(db: Session, page: int, limit: int,
                  author=None, publisher=None,
                  year_from=None, year_to=None,
                  min_rating=None, max_rating=None,
                  min_pages=None, max_pages=None,
                  sort_by="ratings_count", sort_order="desc"):
        """Get paginated books with optional filters and sorting."""
        offset = (page - 1) * limit

        books = BookRepository.get_books_filtered(
            db,
            offset=offset,
            limit=limit,
            author=author,
            publisher=publisher,
            year_from=year_from,
            year_to=year_to,
            min_rating=min_rating,
            max_rating=max_rating,
            min_pages=min_pages,
            max_pages=max_pages,
            sort_by=sort_by,
            sort_order=sort_order,
        )

        total_books = BookRepository.count_books_filtered(
            db,
            author=author,
            publisher=publisher,
            year_from=year_from,
            year_to=year_to,
            min_rating=min_rating,
            max_rating=max_rating,
            min_pages=min_pages,
            max_pages=max_pages,
        )

        return BookListResponse(
            page=page,
            limit=limit,
            total_books=total_books,
            total_pages=math.ceil(total_books / limit) if total_books else 0,
            books=books,
        )

    @staticmethod
    def get_by_id(db: Session, book_id: int):
        return BookRepository.get_by_id(db, book_id=book_id)

    @staticmethod
    def search_books(db: Session, q: str, page: int, limit: int):
        """Search across title, authors, description, and publisher with pagination."""
        offset = (page - 1) * limit

        books = BookRepository.search_books(db, q=q, offset=offset, limit=limit)
        total_books = BookRepository.count_search_results(db, q=q)

        return BookListResponse(
            page=page,
            limit=limit,
            total_books=total_books,
            total_pages=math.ceil(total_books / limit) if total_books else 0,
            books=books,
        )

    # Keep legacy method for backward compatibility
    @staticmethod
    def search_by_title(db: Session, title: str, page: int, limit: int):
        return BookService.search_books(db, q=title, page=page, limit=limit)
