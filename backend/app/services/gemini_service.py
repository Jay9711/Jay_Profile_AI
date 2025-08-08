import os
import google.generativeai as genai
from typing import List, Optional
from ..models.chat import ChatMessage

class GeminiService:
    def __init__(self):
        # Initialize Gemini API
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable is required")
        
        genai.configure(api_key=api_key)
        
        # Use Gemini 2.0 Flash-Lite model
        self.model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        # System prompt for Jay's profile
        self.system_prompt = """
        You are an AI assistant for Jay's profile. You help people learn about Jay by answering questions about his background, skills, experience, and interests. 
        
        Keep responses friendly, professional, and informative. If you don't know something specific about Jay, you can say so politely.
        
        Important: If someone asks inappropriate, intimate, or personal questions that shouldn't be answered, politely decline and redirect the conversation appropriately.
        """
    
    async def generate_response(self, user_message: str, conversation_history: Optional[List[ChatMessage]] = None) -> str:
        try:
            # Build conversation context
            messages = [{"role": "user", "parts": [self.system_prompt]}]
            
            # Add conversation history if provided
            if conversation_history:
                for msg in conversation_history:
                    messages.append({"role": msg.role, "parts": [msg.content]})
            
            # Add current user message
            messages.append({"role": "user", "parts": [user_message]})
            
            # Generate response
            response = self.model.generate_content(messages)
            
            # Check for safety blocks
            if response.prompt_feedback and response.prompt_feedback.block_reason:
                return "I'm sorry, but I cannot respond to that type of question. Please ask something else about Jay's profile or professional background."
            
            return response.text
            
        except Exception as e:
            # Handle various API errors
            if "SAFETY" in str(e).upper() or "BLOCK" in str(e).upper():
                return "I'm sorry, but I cannot respond to that type of question. Please ask something else about Jay's profile or professional background."
            else:
                raise Exception(f"Error generating response: {str(e)}") 