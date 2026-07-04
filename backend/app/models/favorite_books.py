from datetime import datetime

from sqlalchemy import DateTime, func, Integer, BigInteger, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class FavoriteBook(Base):
    __tablename__ = "favorite_books"
    __table_args__ = (
    UniqueConstraint(
        "user_id",
        "book_id",
        name="uq_user_book"
        ),
    )   

    id: Mapped[int] = mapped_column( Integer, primary_key=True, autoincrement=True, index=True)

    user_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    book_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("books.book_id"),
        nullable=False
    )


    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    
    user = relationship("User", back_populates="favorite_books")
    book = relationship("Book", back_populates="favorite_by")

    