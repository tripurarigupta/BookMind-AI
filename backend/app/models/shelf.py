from enum import Enum
from sqlalchemy import Enum as SQLEnum
from sqlalchemy import Integer, BigInteger, ForeignKey, DateTime, func, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from app.database.base import Base

class ShelfStatus(str, Enum):
    WANT_TO_READ = "want_to_read"
    READING = "reading"
    COMPLETED = "completed"
    
class Shelf(Base):
    __tablename__ = "user_books"
    __table_args__ = (
    UniqueConstraint(
        "user_id", 
        "book_id",
        name="uq_user_book_shelf"),
    )
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)

    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False)

    book_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("books.book_id"),nullable=False)
    
    status: Mapped[ShelfStatus] = mapped_column(
    SQLEnum(
        ShelfStatus,
        name="shelf_status",
        values_callable=lambda enum: [e.value for e in enum],
    ),
    nullable=False,
    default=ShelfStatus.WANT_TO_READ,
    server_default=ShelfStatus.WANT_TO_READ.value,
    )

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(),onupdate=func.now())
    
    user = relationship("User", back_populates="user_books")
    book = relationship("Book", back_populates="user_books")