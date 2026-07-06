from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, StringConstraints
from typing import Annotated
class ReviewCreate(BaseModel):
    content: Annotated[ str,StringConstraints( strip_whitespace=True,  min_length=5, max_length=500, ), ]
    

class ReviewUpdate(BaseModel):
    content: Annotated[str, StringConstraints( strip_whitespace=True, min_length=5,max_length=500, ), ]
    
    
    
class ReviewUserResponse(BaseModel):
    username: str
    model_config = ConfigDict(from_attributes=True)
    
    
class ReviewResponse(BaseModel):
    user: ReviewUserResponse
    content: str
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)