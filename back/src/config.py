from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    API_KEY: str
    URL_DATABASE: str
    
    BOT_API: str

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
