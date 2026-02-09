from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    APP_NAME: str = "Vyra Driver API"
    MONGO_URL: str
    DB_NAME: str = "vyra_drive"
    SECRET_KEY: str = "supersecretkey" # Change in production
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30 * 24 * 60 # 1 month for now
    CORS_ORIGINS: str = "*"

    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache()
def get_settings():
    return Settings()
