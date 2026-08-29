from sqlalchemy import select, func, or_
from sqlalchemy.orm import Session
from app.models.book import Book


class BookRepository:

    @staticmethod
    def get_books(db: Session, offset: int, limit: int):
        query = select(Book).offset(offset).limit(limit)
        result = db.execute(query).scalars().all()
        return result

    @staticmethod
    def get_by_id(db: Session, book_id):
        query = select(Book).where(Book.book_id == book_id)
        return db.execute(query).scalar_one_or_none()

    @staticmethod
    def search_by_title(db: Session, title, offset, limit):
        query = (
            select(Book)
            .where(Book.title.ilike(f"%{title}%"))
            .offset(offset)
            .limit(limit)
        )
        return db.execute(query).scalars().all()

    @staticmethod
    def count_books(db: Session):
        query = select(func.count()).select_from(Book)
        total_books = db.execute(query).scalar_one()
        return total_books

    @staticmethod
    def get_books_by_ids(db: Session, book_ids: list[int]):
        books = db.execute(
            select(Book).where(Book.book_id.in_(book_ids))
        ).scalars().all()
        return books

    # ──────────────────────────────────────────────
    # Filtering + Sorting
    # ──────────────────────────────────────────────

    @staticmethod
    def _apply_filters(query, author, publisher, year_from, year_to,
                       min_rating, max_rating, min_pages, max_pages):
        """Apply optional filters to a Book query."""
        if author:
            query = query.where(Book.authors.ilike(f"%{author}%"))
        if publisher:
            query = query.where(Book.publisher.ilike(f"%{publisher}%"))
        if year_from is not None:
            query = query.where(Book.publication_year >= year_from)
        if year_to is not None:
            query = query.where(Book.publication_year <= year_to)
        if min_rating is not None:
            query = query.where(Book.average_rating >= min_rating)
        if max_rating is not None:
            query = query.where(Book.average_rating <= max_rating)
        if min_pages is not None:
            query = query.where(Book.num_pages >= min_pages)
        if max_pages is not None:
            query = query.where(Book.num_pages <= max_pages)
        return query

    @staticmethod
    def _apply_sort(query, sort_by, sort_order):
        """Apply sorting to a Book query."""
        sort_column = {
            "title": Book.title,
            "average_rating": Book.average_rating,
            "ratings_count": Book.ratings_count,
            "publication_year": Book.publication_year,
            "num_pages": Book.num_pages,
        }.get(sort_by, Book.ratings_count)

        if sort_order == "asc":
            query = query.order_by(sort_column.asc())
        else:
            query = query.order_by(sort_column.desc())

        return query

    @staticmethod
    def get_books_filtered(db: Session, offset: int, limit: int,
                           author=None, publisher=None,
                           year_from=None, year_to=None,
                           min_rating=None, max_rating=None,
                           min_pages=None, max_pages=None,
                           sort_by="ratings_count", sort_order="desc"):
        """Get books with optional filters and sorting."""
        query = select(Book)
        query = BookRepository._apply_filters(
            query, author, publisher, year_from, year_to,
            min_rating, max_rating, min_pages, max_pages
        )
        query = BookRepository._apply_sort(query, sort_by, sort_order)
        query = query.offset(offset).limit(limit)
        return db.execute(query).scalars().all()

    @staticmethod
    def count_books_filtered(db: Session,
                             author=None, publisher=None,
                             year_from=None, year_to=None,
                             min_rating=None, max_rating=None,
                             min_pages=None, max_pages=None):
        """Count books with optional filters."""
        query = select(func.count()).select_from(Book)
        query = BookRepository._apply_filters(
            query, author, publisher, year_from, year_to,
            min_rating, max_rating, min_pages, max_pages
        )
        return db.execute(query).scalar_one()

    # ──────────────────────────────────────────────
    # Multi-field Search
    # ──────────────────────────────────────────────

    @staticmethod
    def search_books(db: Session, q: str, offset: int, limit: int):
        """Search across title, authors, and description."""
        search_term = f"%{q}%"
        query = (
            select(Book)
            .where(
                or_(
                    Book.title.ilike(search_term),
                    Book.authors.ilike(search_term),
                    Book.description.ilike(search_term),
                    Book.publisher.ilike(search_term),
                )
            )
            .order_by(Book.ratings_count.desc())
            .offset(offset)
            .limit(limit)
        )
        return db.execute(query).scalars().all()

    @staticmethod
    def count_search_results(db: Session, q: str):
        """Count search results across title, authors, and description."""
        search_term = f"%{q}%"
        query = (
            select(func.count())
            .select_from(Book)
            .where(
                or_(
                    Book.title.ilike(search_term),
                    Book.authors.ilike(search_term),
                    Book.description.ilike(search_term),
                    Book.publisher.ilike(search_term),
                )
            )
        )
        return db.execute(query).scalar_one()
