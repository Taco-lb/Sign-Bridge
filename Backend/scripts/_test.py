import cv2
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier
import numpy as np
import tensorflow as tf

# Define label mapping (Make sure it's in the same order as training labels)
LABELS_FULL = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
    "del", "nothing", "space"
] 

# Initialize webcam 
capture = cv2.VideoCapture(0)
detector = HandDetector(maxHands=1)
# classifier = Classifier("./backend/asl_model_5.keras")
classifier = Classifier("./backend/model/asl_model_augmented_1.keras")

offset = 25 
img_size = 200

while True:
    success, img = capture.read()
    
    if not success:
        print("Failed to capture image")
        break
    
    # Flipping only the feedback but not the detection
    img_flip = cv2.flip(img, 1)
    img_output = img.copy()
    
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

                print(f"Predicted: {predicted_letter}")

                # Display predicted letter on the webcam feed
                cv2.putText(img_output, predicted_letter, (x, y - 20), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 3)

        cv2.imshow("Image Crop White", img_white)

    cv2.imshow("Image", img_output)
    key = cv2.waitKey(1)
    
    if key == ord("q"):
        print("Exiting...")
        break
    
capture.release()
cv2.destroyAllWindows()
