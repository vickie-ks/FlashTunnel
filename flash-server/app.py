from flask import Flask, request, jsonify, send_from_directory, session
from flask_session import Session
from datetime import datetime, timedelta

app = Flask(__name__, static_folder='../flash-client')

app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_USE_SIGNER"] = True
app.config["SECRET_KEY"] = "your_secret_key_here"
Session(app)


def check_session_timeout():
    if 'timestamp' in session:
        session_lifetime = timedelta(minutes=30)  # Set session timeout duration
        if datetime.utcnow() - session['timestamp'] > session_lifetime:
            session.pop('proxy_active', None)
            return jsonify({"error": "Session expired"}), 403  # Or handle as appropriate
    return None


@app.route('/')
def home():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/start', methods=['POST'])
def start_proxy():
    expired_response = check_session_timeout()
    if expired_response:
        return expired_response

    session['proxy_active'] = True
    session['timestamp'] = datetime.utcnow()  # Record the start time
    proxy_ip = 'localhost'  # Proxy server
    proxy_port = '9100'  # Proxy Port

    return jsonify({
        "status": "Proxy started",
        "message": "Traffic is now being routed through the proxy.",
        "proxy_ip": proxy_ip,
        "proxy_port": proxy_port
    })


@app.route('/stop', methods=['POST'])
def stop_proxy():
    expired_response = check_session_timeout()
    if expired_response:
        return expired_response

    session.pop('proxy_active', None)  # End the session by removing the session data
    return jsonify({
        "status": "Proxy stopped",
        "message": "Traffic is no longer being routed through the proxy."
    })


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=9200)
