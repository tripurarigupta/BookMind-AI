from fastapi import FastAPI
from sqlalchemy import text

from app.database.session import engine
from app.api.auth import router as auth_router

app = FastAPI(
    title="BookMind AI",
    version="1.0.0",
    description="AI powered book recommendation platform"
)

# Register API routers
app.include_router(auth_router)


@app.get("/")
def root():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "message": "Database connected successfully!"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }