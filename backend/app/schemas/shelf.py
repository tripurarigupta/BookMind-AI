from datetime import datetime
from pydantic import BaseModel, ConfigDict
from app.models.shelf import ShelfStatus
from app.schemas.book import BookResponse

class ShelfCreate(BaseModel):
    status: ShelfStatus
    

class ShelfResponse(BaseModel):
    book: BookResponse
    status: ShelfStatus
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class ShelfListResponse(BaseModel):
    page: int
    limit: int
    total_books: int
    total_pages: int
    books: list[BookResponse]
