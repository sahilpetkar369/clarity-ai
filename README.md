# Clarity AI

A writing assistant frontend backed by a FastAPI application architecture.

## Project structure

- `frontend/` — static HTML/CSS/JS app
- `backend/` — FastAPI backend service
- `backend/app/` — application package
- `backend/app/api/` — API routes
- `backend/app/core/` — configuration and auth helpers

## Run the backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 5000
```

Then open the app in a browser at:

- http://localhost:5000/

## Architecture

Frontend → FastAPI → AI API / Database / Auth
