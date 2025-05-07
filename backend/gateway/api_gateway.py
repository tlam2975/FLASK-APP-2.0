from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Định nghĩa địa chỉ các microservices
SERVICE_URLS = {
    "login": "http://localhost:5001",
    "home": "http://localhost:5002",
    "payment": "http://localhost:5003"
}

def forward_request(service, endpoint):
    url = f"{SERVICE_URLS[service]}{endpoint}"
    response = requests.request(
        method=request.method,
        url=url,
        headers={key: value for key, value in request.headers if key != 'Host'},
        json=request.get_json()
    )
    return jsonify(response.json()), response.status_code

@app.route("/api/login/<path:endpoint>", methods=["GET", "POST", "PUT", "DELETE"])
def production_planning_proxy(endpoint):
    return forward_request("login", f"/{endpoint}")

@app.route("/api/home/<path:endpoint>", methods=["GET", "POST", "PUT", "DELETE"])
def material_management_proxy(endpoint):
    return forward_request("home", f"/{endpoint}")

@app.route("/api/payment/<path:endpoint>", methods=["GET", "POST", "PUT", "DELETE"])
def production_control_proxy(endpoint):
    return forward_request("payment", f"/{endpoint}")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
    