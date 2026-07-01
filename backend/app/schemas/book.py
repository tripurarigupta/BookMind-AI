from pydantic import BaseModel

class BookResponse(BaseModel):
    book_id: int
    title: str
    average_rating: float
    ratings_count: int
    
class BookDetailResponse(BaseModel):
    book_id: int
    title: str
    description: str
    average_rating: float
    ratings_count: int
    
    
class BookListResponse(BaseModel):
    page: int
    limit: int
    total_books: int 
    total_pages: int
    books: list[BookResponse]