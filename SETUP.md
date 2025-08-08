# Jay Profile AI - Setup Guide

## Prerequisites
- Python 3.8+
- Node.js 16+
- Google Gemini API Key

## Backend Setup (FastAPI + Gemini)

### 1. Set up Python environment
```bash
cd backend
python3 -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Gemini API
Create a `.env` file in the backend directory:
```bash
cp env.example .env
```

Edit `.env` and add your Gemini API key:
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 4. Run the backend server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- Main API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Health Check: http://localhost:8000/api/v1/health

## Frontend Setup (React)

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Start the development server
```bash
npm start
```

The frontend will be available at: http://localhost:3000

## Testing the Application

1. Open http://localhost:3000 in your browser
2. You should see the chat interface
3. Try asking questions like:
   - "What are Jay's skills?"
   - "Tell me about Jay's experience"
   - "What does Jay like to do?"

## API Endpoints

- `POST /api/v1/chat` - Send a message to the AI
- `GET /api/v1/health` - Health check

## Troubleshooting

### Backend Issues
- Make sure your Gemini API key is valid
- Check that all dependencies are installed
- Verify the `.env` file exists and has the correct API key

### Frontend Issues
- Ensure the backend is running on port 8000
- Check browser console for CORS errors
- Make sure all npm dependencies are installed

### Common Errors
- **"GEMINI_API_KEY environment variable is required"**: Add your API key to the `.env` file
- **"Cannot connect to server"**: Make sure the backend is running
- **CORS errors**: The backend is configured to allow localhost:3000 and localhost:5173 