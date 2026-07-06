from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from app.schemas.book import BookResponse
class RatingResponse(BaseModel):
    book: BookResponse
    rating: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
    
    
class RatingCreate(BaseModel):
    rating: int =Field(
        ge=1,
        le=5
    )