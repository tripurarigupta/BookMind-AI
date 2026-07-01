from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:

    @staticmethod
    def get_by_email(db: Session, email: str) -> User | None:
        """
        Get user by email.
        """                           
        result = db.execute(
            select(User).where(User.email == email)
        )

        return result.scalar_one_or_none()


    @staticmethod
    def get_by_username(db: Session, username: str) -> User | None:
        """
        Get user by username.
        """
        result = db.execute(
            select(User).where(User.username == username)
        )

        return result.scalar_one_or_none()


    @staticmethod
    def create_user(db: Session, user: User) -> User:
        """
        Save a new user.
        """
        db.add(user)
        db.commit()
        db.refresh(user)

        return user