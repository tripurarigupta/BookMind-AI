from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    BASE_DIR = Path(__file__).resolve().parent.parent.parent
    model_config = SettingsConfigDict(
    env_file=BASE_DIR / ".env",
    extra="ignore"
    )


settings = Settings()