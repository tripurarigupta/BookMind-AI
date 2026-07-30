from pydantic import BaseModel, ConfigDict
from enum import Enum

class BookResponse(BaseModel):
    book_id: int
    title: str
    authors: str
    publisher: str
    publication_year: int | None
    num_pages: int | None
    image_url: str | None
    average_rating: float
    ratings_count: int
    model_config = ConfigDict(from_attributes=True)
    
class BookDetailResponse(BaseModel):
    book_id: int
    title: str
    authors: str
    publisher: str
    publication_year: int | None
    num_pages: int | None
    image_url: str | None
    description: str
    average_rating: float
    ratings_count: int
    model_config = ConfigDict(from_attributes=True)
    
class BookListResponse(BaseModel):
    page: int
    limit: int
    total_books: int 
    total_pages: int
    books: list[BookResponse]
    
    
class RecommendationType(str, Enum):
    POPULAR = "popular"
    CONTENT_BASED = "content_based"
    COLLABORATIVE = "collaborative"
    HYBRID = "hybrid"
    
    
class RecommendationResponse(BaseModel):
    type: str
    books: list[BookResponse]