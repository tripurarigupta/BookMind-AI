# BookMind AI

An AI-powered intelligent book recommendation platform that combines machine learning algorithms, sentiment analysis, and a conversational chatbot to help readers discover their next favorite book.

## Features

### Core Features
- **Book Browsing** — Browse a vast library of 280,000+ books with filtering and sorting
- **Smart Search** — Find books by title, author, genre, and more
- **Ratings & Reviews** — Rate books and write detailed reviews
- **Favorites** — Save books to your personal favorites list
- **Book Shelves** — Organize books into custom shelves (Want to Read, Currently Reading, Completed)

### AI-Powered Features
- **AI Chatbot** — Conversational assistant to help you discover books
- **Hybrid Recommendations** — Content-based filtering combined with collaborative signals
- **Sentiment Analysis** — AI-powered analysis of book reviews
- **Review Summarization** — Automatic summarization of book reviews
- **Explainable Recommendations** — Understand why each book is recommended to you

### User Experience
- **Authentication** — Secure JWT-based login and registration
- **User Profiles** — Personalized profiles with reading statistics
- **Responsive Design** — Beautiful dark-themed UI that works on all devices

## Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI** | REST API framework |
| **SQLAlchemy** | ORM and database management |
| **PostgreSQL** | Primary database |
| **Alembic** | Database migrations |
| **PyTorch** | Deep learning models |
| **Hugging Face Transformers** | NLP models for sentiment analysis |
| **FAISS** | Vector similarity search |
| **TF-IDF** | Content-based filtering |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **React Router v7** | Client-side routing |
| **TanStack Query** | Server state management |
| **React Hook Form + Zod** | Form handling and validation |
| **Tailwind CSS 4** | Utility-first styling |
| **Axios** | HTTP client |
| **Lucide React** | Icon library |

## Project Structure

```
bookmind-ai/
├── backend/
│   └── app/
│       ├── api/                 # API route handlers
│       │   ├── auth.py          # Authentication endpoints
│       │   ├── book.py          # Book CRUD endpoints
│       │   ├── chatbot.py       # AI chatbot endpoint
│       │   ├── favorite.py      # Favorites management
│       │   ├── rating.py        # Book ratings
│       │   ├── recommendation.py # Recommendation engine
│       │   ├── review.py        # Book reviews
│       │   └── shelf.py         # Book shelves
│       ├── algorithms/          # Recommendation algorithms
│       │   ├── content_based.py # Content-based filtering
│       │   └── popular.py       # Popularity-based ranking
│       ├── core/                # Core configuration
│       ├── database/            # Database setup & session
│       ├── ml/                  # Machine learning models
│       │   └── train_tfidf.py   # TF-IDF training script
│       ├── models/              # SQLAlchemy models
│       ├── repositories/        # Data access layer
│       ├── schemas/             # Pydantic schemas
│       └── services/            # Business logic layer
├── frontend/
│   └── src/
│       ├── components/          # Reusable UI components
│       │   ├── books/           # Book card components
│       │   ├── favorite/        # Favorite button components
│       │   ├── layout/          # App layout & navigation
│       │   ├── rating/          # Rating star components
│       │   ├── recommendations/ # Recommendation sections
│       │   ├── review/          # Review components
│       │   └── shelf/           # Shelf management components
│       ├── pages/               # Page components
│       │   ├── Home/            # Landing & book browsing
│       │   ├── BookDetails/     # Individual book pages
│       │   ├── Favorites/       # Favorites list
│       │   ├── Shelves/         # Book shelves
│       │   ├── Search/          # Search results
│       │   ├── Profile/         # User profile
│       │   ├── Login/           # Login page
│       │   └── Register/        # Registration page
│       ├── api/                 # API client functions
│       ├── context/             # React context providers
│       ├── routes/              # Route definitions
│       ├── services/            # Frontend services
│       └── styles/              # Global styles
└── docs/                        # Documentation
```

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 14+

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
alembic upgrade head

# Start the backend server
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API URL (default: http://localhost:8000)

# Start the development server
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/books` | Get all books (with pagination & filters) |
| GET | `/api/books/{id}` | Get book details |
| POST | `/api/favorites` | Add book to favorites |
| DELETE | `/api/favorites/{id}` | Remove from favorites |
| POST | `/api/ratings` | Rate a book |
| POST | `/api/reviews` | Write a book review |
| GET | `/api/recommendations` | Get personalized recommendations |
| POST | `/api/chatbot` | Chat with AI assistant |
| GET | `/api/shelves` | Get user's book shelves |

## AI Recommendation Engine

BookMind uses a **hybrid recommendation system** combining:

1. **Content-Based Filtering** — Analyzes book metadata (title, author, genres) using TF-IDF vectorization and cosine similarity to find similar books.

2. **Popularity-Based Ranking** — Considers rating counts and average ratings to surface trending and well-loved books.

3. **Sentiment Analysis** — Uses pre-trained transformer models to analyze the sentiment of user reviews, providing deeper insights into book quality.

## UI Highlights

- **Dark Theme** — Easy on the eyes with a modern dark color palette
- **Responsive Grid** — 5-column book grid on desktop, adapts to smaller screens
- **Smooth Animations** — Fade-in and hover effects for an engaging experience
- **Real-time Feedback** — Toast notifications for user actions

## License

This project is for educational purposes.

---

Built with FastAPI, React, and Machine Learning
