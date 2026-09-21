import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

load_dotenv()

app = FastAPI(title="Clarity AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@app.get("/")
def root():
    return {
        "message": "Clarity AI backend is running",
        "status": "success"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/api/rewrite")
def rewrite(data: dict):
    text = str(data.get("text", "")).strip()

    if not text:
        return {
            "success": False,
            "error": "Text is required"
        }

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key or api_key == "your_openai_api_key_here":
        return {
            "success": False,
            "error": "AI API key is not configured. Add OPENAI_API_KEY to backend/.env"
        }

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "Rewrite the text to improve clarity, readability, and tone while preserving the original meaning. Return only the rewritten text."
                },
                {
                    "role": "user",
                    "content": text
                }
            ],
            temperature=0.5,
            max_tokens=500,
        )

        rewritten = completion.choices[0].message.content.strip()

        return {
            "success": True,
            "original": text,
            "rewritten": rewritten
        }
    except Exception as exc:  # pragma: no cover - network/provider errors at runtime
        return {
            "success": False,
            "error": f"AI request failed: {str(exc)}"
        }
