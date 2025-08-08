from fastapi import APIRouter, HTTPException
from ..models.chat import ChatRequest, ChatResponse
from ..services.gemini_service import GeminiService

router = APIRouter()
gemini_service = GeminiService()

@router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(request: ChatRequest):
    try:
        response = await gemini_service.generate_response(
            user_message=request.message,
            conversation_history=request.conversation_history
        )
        
        return ChatResponse(
            response=response,
            success=True
        )
        
    except Exception as e:
        return ChatResponse(
            response="",
            success=False,
            error=str(e)
        )

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Jay Profile AI"} 