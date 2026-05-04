from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class GameEntity(BaseModel):
    id: str
    name: str
    genre: str
    version: str
    image_url: Optional[str] = None

class MechanicCategory(BaseModel):
    id: str
    game_id: str
    name: str
    description: Optional[str] = None

class MechanicSnapshot(BaseModel):
    id: str
    category_id: str
    name: str
    visual_url: Optional[str] = None
    variables: Dict[str, Any]
    logic_description: str
