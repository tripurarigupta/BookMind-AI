from typing import Optional
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Query
from app.schemas.book import (
    BookListResponse,
    BookResponse,
    BookDetailResponse,
    SortField,
    SortOrder,
)
from app.database.session import get_db
from app.services.book_service import BookService


router = APIRouter(
    prefix="/books",
    tags=["Books"],
)


@router.get("/", response_model=BookListResponse)
def get_books(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(24, ge=1, le=100, description="Items per page"),
    # Sorting
    sort_by: SortField = Query(
        SortField.RATINGS_COUNT,
        description="Field to sort by",
    ),
    sort_order: SortOrder = Query(
        SortOrder.DESC,
        description="Sort direction",
    ),
    # Filtering
    author: Optional[str] = Query(None, description="Filter by author name"),
    publisher: Optional[str] = Query(None, description="Filter by publisher"),
    year_from: Optional[int] = Query(None, description="Min publication year"),
    year_to: Optional[int] = Query(None, description="Max publication year"),
    min_rating: Optional[float] = Query(None, ge=0, le=5, description="Min average rating"),
    max_rating: Optional[float] = Query(None, ge=0, le=5, description="Max average rating"),
    min_pages: Optional[int] = Query(None, ge=0, description="Min page count"),
    max_pages: Optional[int] = Query(None, ge=0, description="Max page count"),
    db: Session = Depends(get_db),
):
    """
    Get paginated books with optional sorting and filtering.

    **Sorting:**
    - `sort_by`: title, average_rating, ratings_count, publication_year, num_pages
    - `sort_order`: asc, desc

    **Filtering:**
    - `author`: partial match on author name
    - `publisher`: partial match on publisher
    - `year_from` / `year_to`: publication year range
    - `min_rating` / `max_rating`: rating range (0-5)
    - `min_pages` / `max_pages`: page count range
    """
    return BookService.get_books(
        db=db,
        page=page,
        limit=limit,
        author=author,
        publisher=publisher,
        year_from=year_from,
        year_to=year_to,
        min_rating=min_rating,
        max_rating=max_rating,
        min_pages=min_pages,
        max_pages=max_pages,
        sort_by=sort_by.value,
        sort_order=sort_order.value,
    )


@router.get("/search", response_model=BookListResponse)
def search_books(
    q: str = Query(..., min_length=1, description="Search query"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db),
):
    """
    Search across title, authors, description, and publisher.

    Returns paginated results sorted by popularity (ratings count).
    """
    return BookService.search_books(db=db, q=q, page=page, limit=limit)


@router.get("/{book_id}", response_model=BookDetailResponse)
def get_book_by_id(
    book_id: int,
    db: Session = Depends(get_db),
):
    """Get full book details by ID."""
    return BookService.get_by_id(db=db, book_id=book_id)
