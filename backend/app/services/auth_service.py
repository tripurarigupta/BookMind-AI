from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate, UserLogin
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)


class AuthService:

    @staticmethod
    def register_user(
        db: Session,
        user_data: UserCreate,
    ) -> User:

        # Check username
        existing_username = UserRepository.get_by_username(
            db,
            user_data.username,
        )

        if existing_username:
            raise ValueError("Username already exists.")

        # Check email
        existing_email = UserRepository.get_by_email(
            db,
            user_data.email,
        )

        if existing_email:
            raise ValueError("Email already exists.")

        # Hash password
        hashed_pw = hash_password(
            user_data.password
        )

        # Create User model
        user = User(
            username=user_data.username,
            email=user_data.email,
            hashed_password=hashed_pw,
        )

        return UserRepository.create_user(
            db,
            user,
        )

    @staticmethod
    def login_user(
        db: Session,
        login_data: UserLogin,
    ) -> str:

        identifier = login_data.identifier

        if "@" in identifier:
            user = UserRepository.get_by_email(
                db,
                identifier,
            )
        else:
            user = UserRepository.get_by_username(
                db,
                identifier,
            )

        if user is None:
            raise ValueError("Invalid credentials.")

        if not verify_password(
            login_data.password,
            user.hashed_password,
        ):
            raise ValueError("Invalid credentials.")

        token = create_access_token(
            {
                "sub": user.email,
            }
        )

        return token