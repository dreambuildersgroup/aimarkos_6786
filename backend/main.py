from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AImarkOS Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "AImarkOS Backend is live 🚀"}

@app.get("/agents/status")
async def agents_status():
    return {"active_agents": 9, "roas": "4.21x"}  # placeholder – we'll connect real CrewAI here
