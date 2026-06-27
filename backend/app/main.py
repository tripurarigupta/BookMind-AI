from fastapi import FastAPI

app = FastAPI(
    title="BookMind AI",
    version="1.0.0",
    description="AI powered book recommendation platform"
)

@app.get("/")
def root():
    return {
        "message": "Welcome to BookMind AI"
    }
    
@app.get("/health")
def health():
    return {
        "status": "healthy"
    }