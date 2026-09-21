from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(tags=["writing"])


class RewriteRequest(BaseModel):
    text: str
    tone: str = "clear"


class RewriteResponse(BaseModel):
    original: str
    improved: str
    tone: str


@router.get("/status")
def status() -> dict:
    return {"status": "ready", "service": "clarity-ai"}


@router.post("/rewrite", response_model=RewriteResponse)
def rewrite(payload: RewriteRequest) -> RewriteResponse:
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail="Text is required.")

    improved = " ".join(payload.text.split())
    improved = improved.strip()

    return RewriteResponse(
        original=payload.text,
        improved=improved,
        tone=payload.tone,
    )
