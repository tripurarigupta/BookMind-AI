from sqlalchemy import Integer, BigInteger, ForeignKey, DateTime, func, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from app.database.base import Base

class Rating(Base):
    __tablename__ = "ratings"
    __table_args__ = (
    UniqueConstraint(
        "user_id",
        "book_id",
        name="uq_user_book_rating"
    ),
    CheckConstraint(
            "rating >= 1 AND rating <= 5",
            name="ck_rating_range",
        ),
    )    
    
    
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        nullable=False
    )
    
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
    
    rating: Mapped[int] = mapped_column(
        Integer,
        nullable=False
        
    )
    
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )
    
    user = relationship("User", back_populates="ratings")
    book = relationship("Book", back_populates="ratings")