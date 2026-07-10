from fastapi import FastAPI
from sqlalchemy import text

from app.database.session import engine
from app.api.auth import router as auth_router
from app.api.book import router as book_router
from app.api.favorite import router as favorite_router
from app.api.rating import router as rating_router
from app.api.review import router as review_router
from app.api.recommendation import router as recommendation_router
from app.api.shelf import router as shelf_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="BookMind AI",
    version="1.0.0",
    description="AI powered book recommendation platform"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(auth_router)

# Book API routers
app.include_router(book_router)


# Favorite Book API routers
app.include_router(favorite_router)


#  Book Rating API routers
app.include_router(rating_router)


#  Book Review API routers
app.include_router(review_router)


#  Book Recommendation API routers
app.include_router(recommendation_router)


#  Book Shelf API routers
app.include_router(shelf_router)


@app.get("/")
def root():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "message": "Database connected successfully!"
    }
