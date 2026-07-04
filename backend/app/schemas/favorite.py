from datetime import datetime
from pydantic import BaseModel, ConfigDict
from app.schemas.book import BookResponse
class FavoriteResponse(BaseModel):
    book: BookResponse
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
    