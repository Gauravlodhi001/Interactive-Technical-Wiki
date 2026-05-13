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
    GameEntity(id="minecraft", name="Minecraft", genre="Sandbox", version="1.20", image_url="/images/games/Minecraft.jpg"),
    GameEntity(id="league-of-legends", name="League of Legends", genre="MOBA", version="14.5", image_url="/images/games/League of Legends.jpg"),
    GameEntity(id="clash-of-clans", name="Clash of Clans", genre="Strategy", version="16.1", image_url="/images/games/Clash of clan.jpg"),
    GameEntity(id="clash-royale", name="Clash Royale", genre="Strategy", version="3.3314", image_url="/images/games/Clash Royale.jpg"),
    GameEntity(id="free-fire", name="Free Fire", genre="Battle Royale", version="1.103", image_url="/images/games/freefire.jpg"),
    GameEntity(id="mobaa5v5", name="MOBAA5v5", genre="MOBA", version="1.0", image_url="/images/games/Mobba 5v5.png"),
    GameEntity(id="dota-2", name="Dota 2", genre="MOBA", version="7.35", image_url="/images/games/Dota 2.png")
]

MOCK_CATEGORIES = [
    MechanicCategory(id="redstone", game_id="minecraft", name="Redstone", description="Logic and circuitry mechanics"),
    MechanicCategory(id="scaling", game_id="league-of-legends", name="Scaling", description="Champion stat scaling mechanics"),
    MechanicCategory(id="troop-ai", game_id="clash-of-clans", name="Troop AI", description="Pathfinding and targeting logic"),
    MechanicCategory(id="elixir-trade", game_id="clash-royale", name="Elixir Trading", description="Resource advantage mechanics"),
    MechanicCategory(id="recoil", game_id="free-fire", name="Weapon Recoil", description="Spray patterns and reset times"),
    MechanicCategory(id="lane-control", game_id="mobaa5v5", name="Lane Control", description="Minion wave management")
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
        id="wall-breaker-pathing",
        category_id="troop-ai",
        name="Wall Breaker Targeting",
        variables={"target_preference": "Enclosed Buildings", "damage_multiplier_vs_walls": 40},
        logic_description="Wall Breakers target the nearest building that is partially or fully enclosed by un-destroyed walls."
    ),
    MechanicSnapshot(
        id="positive-elixir-trade",
        category_id="elixir-trade",
        name="Log vs Goblin Barrel",
        variables={"log_cost": 2, "barrel_cost": 3, "net_elixir": "+1"},
        logic_description="Using a 2-elixir Log to counter a 3-elixir Goblin Barrel generates a +1 elixir advantage."
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
