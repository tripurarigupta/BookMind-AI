from pydantic import BaseModel, ConfigDict

class BookResponse(BaseModel):
    book_id: int
    title: str
    average_rating: float
    ratings_count: int
    model_config = ConfigDict(from_attributes=True)
    
class BookDetailResponse(BaseModel):
    book_id: int
    title: str
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