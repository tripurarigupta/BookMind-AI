from sqlalchemy import select
from app.database.session import SessionLocal
from app.models.book import Book

from sklearn.feature_extraction.text import TfidfVectorizer

import pickle

db = SessionLocal()

try:
    books= db.execute(select(Book.book_id, Book.title, Book.description)).mappings().all()
finally:
    db.close()
    
book_ids = []
documents = []
for book in books:
    book_ids.append(book["book_id"])
    title = book["title"] or ""
    description = book["description"] or ""
    documents.append(f"{title} {description}")
    

vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix = vectorizer.fit_transform(documents)

with open("app/ml/tfidf_vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

with open("app/ml/tfidf_matrix.pkl", "wb") as f:
    pickle.dump(tfidf_matrix, f)

with open("app/ml/book_ids.pkl", "wb") as f:
    pickle.dump(book_ids, f)
    
    
print("Training completed successfully!")
print(f"Books processed: {len(book_ids)}")
print(f"Vocabulary size: {len(vectorizer.vocabulary_)}")
print(f"Matrix shape: {tfidf_matrix.shape}")