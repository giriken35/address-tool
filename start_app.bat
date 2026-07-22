@echo off
echo Starting Address Normalizer Tool...

echo Starting FastAPI Backend...
start cmd /k "cd backend && uvicorn main:app --reload --port 8000"

echo Starting Next.js Frontend...
start cmd /k "cd frontend && npm run dev"

echo Both services started. Next.js will be available at http://localhost:3000
