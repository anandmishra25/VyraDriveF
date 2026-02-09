import pytest
from mongomock_motor import AsyncMongoMockClient
from app.main import app
from app.core.database import db
from fastapi.testclient import TestClient

@pytest.fixture(scope="module")
def test_client():
    # Use AsyncMongoMockClient which mocks Motor's async interface
    mock_client = AsyncMongoMockClient()
    
    # Patch the db.client and get_db
    # Since db.get_db is a sync method returning the client["db_name"], we patch it.
    
    # In app/core/database.py:
    # def get_db(self): return self.client[settings.DB_NAME]
    
    # We patch the database instance used by the app to use our mock client
    db.client = mock_client
    
    # We need to ensure get_db returns the mock database from the mock client
    # The original get_db implementation works if db.client is patched, providing settings match.
    # But let's be explicit:
    
    def get_mock_db():
        return mock_client.vyra_drive_test
        
    original_get_db = db.get_db
    db.get_db = get_mock_db
    
    with TestClient(app) as client:
        yield client
        
    # Teardown / Restore (optional for unit tests in this scope)
    db.get_db = original_get_db
