# Sign Bridge

## A Senior Computer Science Project by Antoine M. Harb

## 📌 Project Overview
Sign Bridge is a **sign language recognition application** that provides learning options for the **American Sign Language (ASL)** while also providing transcription into text and speech. It aims to bridge communication gaps for the Deaf and Hard of Hearing (DHH) community using **machine learning**, specfically **deep learning**, and **computer vision**.

---

## 🛠️ Features
- ✅ **Real-time ASL Recognition** using a deep learning model.
- ✅ **Learn ASL Mode** – Practice signing letters and words while receive feedback.
- ✅ **Text-to-Speech** conversion for better communication.
- ✅ **Frontend:** Built with React and Vite.
- ✅ **Backend:** Flask-based API with Keras/TensorFlow for sign detection in Python.

---

## 🎯 Tech Stack
| **Technology** | **Usage** |
|--------------|----------|
| React + Vite | Frontend UI |
| Flask | Backend API |
| TensorFlow/Keras + MediaPipe | Deep Learning Model |
| OpenCV + CvZone | Image Processing |
| Ngrok | Localhost tunneling (for testing) |

---

## 📂 Project Structure
```
SignBridge/
│── Backend/                # Python backend with Flask
│   │── model/              # Trained DL models
|   │── model_1/            # Test Trained DL models
|   │── pictures/           # ASL alphabet reference image
|   │── scripts/            # Various python scripts for extracting landmarks, training, testing, and collecting data 
│   │── app.py              # Main Flask app
│   │── email_handler.py    # Handles the email requests that are done through the website 
│   │── newsletter.py       # Handles the newsletter MongoDB storage connection
│   │── requirements.txt    # requirements to run and use python backend
│   └── sign_detection.py   # ASL recognition logic
│
│── frontend/               # React-based frontend
│   │── src/                # React components
│   │── public/             # Static assets
│   └── vite.config.js      # Vite configuration
│
│── .gitignore              # Git ignored files
│── README.md               # Project documentation
```

---

## 🚀 Setup & Installation

### **1️⃣ Clone the repository**
```sh
git clone https://github.com/Taco-Lb/Sign-Bridge.git
cd SignBridge
```

### **2️⃣ Backend Setup**
> **Prerequisites:** Python 3.9 – 3.12 (if any issues use 3.11.9), pip, virtualenv
```sh
cd Backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt # Install all of the requirements to run the python backend
python app.py  # Start the backend
#or
flask run --host=0.0.0.0 --port=5000 #start the backend with flask (suggested)
```

### **3️⃣ Frontend Setup**
> **Prerequisites:** React.js (v18+), npm (v11+) 
```sh
cd frontend
npm install
npm run dev  # Start the frontend
#or
vite --host #to run vite hosting server (suggested)
```

### **4️⃣ Ngrok Setup - Testing on Apple devices remotely through WSS**
> **Note:** If you decide to run this locally, create in *frontend* '.env' file to create localhost backend and frontend urls!
> **Prerequisites:** Install the latest version of Ngrok and setup. Then follow these instructions

#### **1. Create Ngrok Config file**
Run this on terminal
```sh
ngrok config add-authtoken YOUR_NGROK_AUTH_TOKEN
```
Then, create or edit the Ngrok config file:

- On Linux, it's located at ~/.config/ngrok/ngrok.yml
- On MacOS (Darwin), it's located at ~/Library/Application Support/ngrok/ngrok.yml
- On Windows, it's located at %HOMEPATH%\AppData\Local\ngrok\ngrok.yml

Edit and add this:

```yaml
version: "2"
authtoken: YOUR_NGROK_AUTH_TOKEN

tunnels:
frontend:
    addr: 5173
    proto: http
backend:
    addr: 5000
    proto: http
```

#### **2. Run all of the ports from ngrok terminal**

```sh
ngrok start --all
```

- You can create a '.env' file in the *frontend* where you can store the newly created 'VITE_API_NGROK' (copy the backend port URL for this variable).
- Use the frontend port URL to run the application on any device.

---

## 📸 Demo (Screenshots)
> Left Web, Right Mobile
#### **Home Page**
![Sign Bridge Demo](https://github.com/user-attachments/assets/5506ab05-67a2-4af4-b971-41222ea0f06d)
#### **Learn Page**
![Sign Bridge Learn](https://github.com/user-attachments/assets/de16369d-f2a2-43d2-ab29-f8161eaa4a80)
#### **Transcribe Page**
![Sign Bridge Transcribe](https://github.com/user-attachments/assets/2a2a1719-b6cb-4e73-8361-30fe2917c335)
#### **Contact Page**
![Sign Bridge Contact](https://github.com/user-attachments/assets/7d08289d-bb82-4595-8b80-7ee620d8fb8a)
---

<!-- ## 🤝 Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature-branch`
5. Open a Pull Request.
---
--- -->

## 📄 License

This project is **not open source**.  
Code is provided for reference only — **do not reuse, copy, or modify** without permission.

📬 Contact for permission:
- Email: antoinemharb@outlook.com
- GitHub: [Taco-lb](https://github.com/Taco-lb)
- LinkedIn: [Antoine M. Harb](https://www.linkedin.com/in/antoinemharb/)

## 🌎 Connect with Me
🔗 [LinkedIn](https://www.linkedin.com/in/antoinemharb/)  
😺 [GitHub](https://github.com/Taco-lb)  
📧 Email: antoinemharb@outlook.com

---

## ⭐ Star the Repo!
If you like this project, don't forget to give it a ⭐ on GitHub!

