from back.src.http import CHTTPClient
from back.src.config import settings

c_client = CHTTPClient(
    base_url="https://openapiv1.coinstats.app",
    api_key= settings.API_KEY
)
