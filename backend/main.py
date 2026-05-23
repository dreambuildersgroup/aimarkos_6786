from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AImarkOS Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "✅ AImarkOS Backend is live on EKS 🚀"}

@app.get("/agents/status")
async def agents_status():
    return {
        "active_agents": 9,
        "roas": "4.21x",
        "message": "Connected from EKS - Stable version"
    }

@app.post("/agents/run")
async def run_agents(goal: str = "Test goal"):
    return {
        "status": "✅ AI endpoint ready (stable)",
        "goal": goal,
        "result": "Full AI agents will be added after we confirm stability."
    }