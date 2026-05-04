from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from models.schemas import GameEntity, MechanicCategory, MechanicSnapshot

app = FastAPI(title="Multi-Game Mechanics Encyclopedia API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Data
MOCK_GAMES = [
    GameEntity(id="minecraft", name="Minecraft", genre="Sandbox", version="1.20"),
    GameEntity(id="elden-ring", name="Elden Ring", genre="Action RPG", version="1.10"),
    GameEntity(id="league-of-legends", name="League of Legends", genre="MOBA", version="14.5")
]

MOCK_CATEGORIES = [
    MechanicCategory(id="redstone", game_id="minecraft", name="Redstone", description="Logic and circuitry mechanics"),
    MechanicCategory(id="frame-data", game_id="elden-ring", name="Frame Data", description="Animation and i-frame data"),
    MechanicCategory(id="scaling", game_id="league-of-legends", name="Scaling", description="Champion stat scaling mechanics")
]

MOCK_SNAPSHOTS = [
    MechanicSnapshot(
        id="comparator-clock",
        category_id="redstone",
        name="Comparator Clock",
        variables={"tick_speed": 1, "materials": ["Redstone Dust", "Redstone Comparator", "Solid Block"]},
        logic_description="A highly responsive clock circuit created using a redstone comparator in subtract mode."
    ),
    MechanicSnapshot(
        id="parry-window",
        category_id="frame-data",
        name="Buckler Parry",
        variables={"startup_frames": 8, "active_frames": 11, "recovery_frames": 35},
        logic_description="The timing window for successfully deflecting an enemy attack using the Buckler shield."
    )
]

@app.get("/")
async def root():
    return {"message": "Welcome to the Multi-Game Mechanics Encyclopedia API! Visit /docs for the API documentation."}

@app.get("/api/games", response_model=List[GameEntity])
async def get_games():
    return MOCK_GAMES

@app.get("/api/games/{game_id}", response_model=GameEntity)
async def get_game(game_id: str):
    for game in MOCK_GAMES:
        if game.id == game_id:
            return game
    raise HTTPException(status_code=404, detail="Game not found")

@app.get("/api/mechanics/{game_id}", response_model=List[MechanicSnapshot])
async def get_mechanics(game_id: str, category: str = None):
    # Find categories for this game
    categories_for_game = [c.id for c in MOCK_CATEGORIES if c.game_id == game_id]
    
    if category and category not in categories_for_game:
        return []
        
    results = []
    for snapshot in MOCK_SNAPSHOTS:
        if snapshot.category_id in categories_for_game:
            if category and snapshot.category_id != category:
                continue
            results.append(snapshot)
            
    return results
