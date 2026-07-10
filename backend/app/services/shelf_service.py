import math

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.shelf import ShelfStatus
from app.repositories.book_repository import BookRepository
from app.repositories.shelf_repository import ShelfRepository


class ShelfService:

    @staticmethod
    def create_shelf(
        db: Session,
        user_id: int,
        book_id: int,
        status: ShelfStatus
    ):
        book = BookRepository.get_by_id(db, book_id=book_id)

        if not book:
            raise HTTPException(
                status_code=404,
                detail="Book not found"
            )

        shelf = ShelfRepository.get_by_user_and_book(
            db,
            user_id=user_id,
            book_id=book_id
        )

        if shelf:
            if shelf.status != status:
                shelf.status = status
        else:
            shelf = ShelfRepository.create_shelf(
                db,
                user_id=user_id,
                book_id=book_id,
                status=status
            )

        db.commit()
        db.refresh(shelf)

        return shelf

    @staticmethod
    def get_books_by_shelf_status(
        db: Session,
        user_id: int,
        status: ShelfStatus,
        page: int,
        limit: int
    ):
        offset = (page - 1) * limit

        shelves = ShelfRepository.get_books_by_status(
            db=db,
            user_id=user_id,
            status=status,
            offset=offset,
            limit=limit
        )

        total_books = ShelfRepository.count_books_by_status(
            db=db,
            user_id=user_id,
            status=status
        )

        total_pages = math.ceil(total_books / limit) if total_books else 0

        return {
            "page": page,
            "limit": limit,
            "total_books": total_books,
            "total_pages": total_pages,
            "books": [shelf.book for shelf in shelves]
        }

    @staticmethod
    def delete_book_from_shelf(
        db: Session,
        user_id: int,
        book_id: int
    ):
        shelf = ShelfRepository.get_by_user_and_book(
            db=db,
            user_id=user_id,
            book_id=book_id
        )

        if not shelf:
            raise HTTPException(
                status_code=404,
                detail="Book not found in shelf"
            )

        ShelfRepository.delete_book_from_shelf(
            db=db,
            user_id=user_id,
            book_id=book_id
        )

        db.commit()

        return {
            "message": "Book removed from shelf successfully"
        }