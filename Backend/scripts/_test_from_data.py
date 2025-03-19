import os
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier
import numpy as np
import cv2

# Define label mapping (Make sure it's in the same order as training labels)
LABELS_FULL = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
    "del", "nothing", "space"
]

# Initialize hand detector and classifier
detector = HandDetector(maxHands=1)
classifier = Classifier("../model/asl_model_augmented_1.keras")

# Define folder containing test images
test_folder = "E:/DataSets/dataset FULL/asl_alphabet_test/asl_alphabet_test"  # Replace with your test folder path

# Parameters
offset = 25 
img_size = 200

# Counter for numbering predictions
counter = 1

# Loop through all images in the test folder
for filename in os.listdir(test_folder):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
        # Read the image
        img_path = os.path.join(test_folder, filename)
        img = cv2.imread(img_path)
        
        if img is None:
            print(f"Failed to read image: {filename}")
            continue
        
        # Detect hands in the image
        hands, img = detector.findHands(img)
        
        if hands:
            hand = hands[0]
            x, y, w, h = hand['bbox']

            # Ensure cropping stays within image bounds
            y1, y2 = max(0, y - offset), min(img.shape[0], y + h + offset)
            x1, x2 = max(0, x - offset), min(img.shape[1], x + w + offset)
            img_crop = img[y1:y2, x1:x2]

            # Resize the cropped image
            img_crop_resized = cv2.resize(img_crop, (img_size, img_size))
            img_white = np.ones((img_size, img_size, 3), np.uint8) * 255
            img_white[0: img_size, 0: img_size] = img_crop_resized
            
            # Process landmarks
            if hand:
                lm_list = hand["lmList"]  # List of 21 hand landmarks
                if len(lm_list) == 21:  # Ensure all 21 landmarks are detected
                    keypoints = np.array(lm_list)[:, :3].flatten()  # Extract only (x, y, z)
                    keypoints = np.expand_dims(keypoints, axis=0)  # Reshape for model input

                    prediction = classifier.model.predict(keypoints)
                    index = np.argmax(prediction)
                    predicted_letter = LABELS_FULL[index]  # Convert index to letter

                    # Print the result to the console
                    print(f"{counter}. {predicted_letter}")
        else:
            # No hand detected
            print(f"{counter}. No hand detected")
        
        counter += 1  # Increment the counter

print("Testing complete.")