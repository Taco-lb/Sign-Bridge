import cv2
import os
import numpy as np
import mediapipe as mp
import pandas as pd

# Initialize MediaPipe Hands for recognitions
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.5)

# Defining the path for the kaggle dataset 
DATA_DIR_FULL = "E:/DataSets/dataset FULL/asl_alphabet_train/asl_alphabet_train"
LABELS_FULL = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
    "del", "nothing", "space"
]

#Arrays in order to store the data temporary to be later on saved as binary npy files 
data = []
labels = []

# Process each image
for label in LABELS_FULL:
    label_dir = os.path.join(DATA_DIR_FULL, label)
    for img_name in os.listdir(label_dir):
        img_path = os.path.join(label_dir, img_name)
        img = cv2.imread(img_path)
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Detect hand landmarks
        results = hands.process(img_rgb)
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                keypoints = np.array([[lm.x, lm.y, lm.z] for lm in hand_landmarks.landmark]).flatten()
                data.append(keypoints)
                labels.append(LABELS_FULL.index(label))

# Convert to NumPy arrays
data = np.array(data)
labels = np.array(labels)

# Save for later use
np.save("X_data.npy", data)
np.save("y_labels.npy", labels)

print("All landmarks have been extracted and stored in their respective files.")