from sqlalchemy import Integer, String, Float, Text, BigInteger
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base


class Book(Base):
    __tablename__ = "books"

    book_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        index=True
    )

    title: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
        index=True
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    average_rating: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    ratings_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )
    
    favorite_by = relationship(
    "FavoriteBook",
    back_populates="book",
    )
    
    ratings = relationship(
    "Rating",
    back_populates="book")
    
    reviews = relationship(
        "Review",
        back_populates="book"
    )