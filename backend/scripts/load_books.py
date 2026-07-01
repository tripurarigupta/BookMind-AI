import pandas as pd
from app.models.book import Book
from app.database.session import SessionLocal
dataset = pd.read_csv("../datasets/books_sample.csv")
db = SessionLocal()
books = []
for _, row in dataset.iterrows():
    book = Book(
        book_id = row['book_id'],
        title = row['title'],
        description = row['description'],
        average_rating = row['average_rating'],
        ratings_count = row['ratings_count']
        
    )
    books.append(book)
    
try:
    db.add_all(books)
    db.commit()
except Exception as e:
    db.rollback()
    print("Error: ",e)
finally:
    db.close()
    
print(f"Successfully imported {len(books)} books.")