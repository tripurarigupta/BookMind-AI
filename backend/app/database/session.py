from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from app.core.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    echo=True
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)


def get_db() -> Generator[Session, None, None]:
    """
    Database dependency.
    Creates a new database session for every request.
    """

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()