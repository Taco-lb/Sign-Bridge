from flask import jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime

# Load environment variables
load_dotenv()

# Email configuration
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')

# MongoDB configuration
MONGO_URI = os.getenv('MONGO_URI')
client = MongoClient(MONGO_URI)
db = client['newsletter']
subscribers_collection = db['subscribers'] 

def subscribe_newsletter(data):
    email = data.get('email')

    if not email:
        return jsonify({'message': 'Email is required'}), 400

    try:
        #CHeck if user exists and if not add him to the db
        if subscribers_collection.find_one({'email': email}):
            return jsonify({'message': 'Email already subscribed'}), 400

        subscriber = {
            'email': email,
            'subscribed_at': datetime.utcnow(),
        }
        subscribers_collection.insert_one(subscriber)

        # Send a confirmation email
        msg = MIMEText('Thank you for subscribing to our newsletter! Every week you will be receiving news about ASL and about improvements of our webapp.👌🏻🤟🏻✌🏻')
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = email
        msg['Subject'] = 'Welcome to the SignBridge Newsletter!'

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, email, msg.as_string())

        return jsonify({'message': 'Subscription successful!'}), 200

    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'message': 'Failed to subscribe. Please try again.'}), 500