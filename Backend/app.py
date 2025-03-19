from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import base64
from sign_detection import process_image
from email_handler import send_email
from newsletter import subscribe_newsletter

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

# SocketIO event for sign detection
@socketio.on('frame')
def handle_frame(base64_string):
    try:
        image_bytes = base64.b64decode(base64_string)
        prediction = process_image(image_bytes)
        emit('prediction', prediction)
    except Exception as e:
        print(f"Error handling frame: {e}")

# Route to handle contact form submission
@app.route('/api/send-email', methods=['POST'])
def handle_email():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    if not all([name, email, subject, message]):
        return jsonify({'message': 'All fields are required'}), 400

    if send_email(name, email, subject, message):
        return jsonify({'message': 'Email sent successfully'}), 200
    else:
        return jsonify({'message': 'Failed to send email'}), 500

# Route to handle newsletter subscription
@app.route('/api/subscribe-newsletter', methods=['POST'])
def handle_newsletter():
    data = request.json
    return subscribe_newsletter(data)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)