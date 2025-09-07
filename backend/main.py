from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv
import os
from profanityfilter import ProfanityFilter  # Import ProfanityFilter

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize FastAPI app and Gemini client
app = FastAPI()
client = genai.Client(api_key=GEMINI_API_KEY)

# Initialize ProfanityFilter
pf = ProfanityFilter()

# CORS setup
origins = [
    "http://localhost:5173",  
    "https://chatbot-black-delta.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # Which domains can access
    allow_credentials=True,       # Allow cookies
    allow_methods=["*"],          # GET, POST, PUT, DELETE
    allow_headers=["*"],          # Headers like Authorization
)

class UserMessage(BaseModel):
    message: str

@app.post("/chat/")
async def chat(msg: UserMessage):
    # 1️⃣ Clean user input
    user_input = msg.message.strip()

    if not user_input:
        return {"response": "Please provide a valid message."}

    # 2️⃣ Check for offensive words in user input
    if pf.is_profane(user_input):
        return {"response": "Your message contains inappropriate content. Please try again."}

    try:
        # 3️⃣ Generate content using Gemini API
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=user_input
        )
        gemini_response = response.text

        # 4️⃣ Filter Gemini API response
        clean_response = pf.censor(gemini_response)

        return {"message": clean_response, "success": True}

    except Exception as e:
        return {"response": f"An error occurred: {e}"}
