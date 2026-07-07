from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.book import Book

class PopularAlgorithm:
    
    @staticmethod
    def recommend(db:Session, limit = 20):
        recommandation = db.execute(select(Book).order_by(Book.ratings_count.desc(), Book.average_rating.desc()).limit(limit)).scalars().all()
        return recommandation