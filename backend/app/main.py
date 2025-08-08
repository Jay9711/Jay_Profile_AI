from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.chat import router as chat_router

app = FastAPI(title="Jay Profile AI", description="AI-powered profile assistant")

# Add CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include chat routes
app.include_router(chat_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {
        "message": "Jay Profile AI backend is running!",
        "docs": "/docs",
        "health": "/api/v1/health"
    } 