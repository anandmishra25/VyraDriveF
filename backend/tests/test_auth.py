def test_signup(test_client):
    response = test_client.post("/auth/signup", json={
        "full_name": "Test User",
        "email": "test@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data
    assert "hashed_password" not in data

def test_signup_duplicate_email(test_client):
    # Try to signup again with same email
    response = test_client.post("/auth/signup", json={
        "full_name": "Test User 2",
        "email": "test@example.com",
        "password": "password123"
    })
    assert response.status_code == 400
    assert response.json()["detail"] == "Email already registered"

def test_login_success(test_client):
    response = test_client.post("/auth/login", data={
        "username": "test@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_failure(test_client):
    response = test_client.post("/auth/login", data={
        "username": "test@example.com",
        "password": "wrongpassword"
    })
    assert response.status_code == 401

def test_guest_login(test_client):
    response = test_client.post("/auth/guest")
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
