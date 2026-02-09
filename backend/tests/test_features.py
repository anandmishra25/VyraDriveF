def test_dashboard_summary_guest(test_client):
    # Login as guest
    login_res = test_client.post("/auth/guest")
    token = login_res.json()["access_token"]
    
    headers = {"Authorization": f"Bearer {token}"}
    response = test_client.get("/dashboard/summary", headers=headers)
    
    assert response.status_code == 200
    data = response.json()
    assert "shift_active" in data
    assert "today_earnings" in data

def test_trips_list(test_client):
    # Login as guest
    login_res = test_client.post("/auth/guest")
    token = login_res.json()["access_token"]
    
    headers = {"Authorization": f"Bearer {token}"}
    response = test_client.get("/trips/", headers=headers)
    
    assert response.status_code == 200
    assert isinstance(response.json(), list)
