import cv2
import numpy as np
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier

# Define label mapping
LABELS_FULL = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
    "del", "nothing", "space"
]

# Initialize models
detector = HandDetector(maxHands=1)
classifier = Classifier("./model/asl_model_augmented_1.keras")

def process_image(image_bytes):
    try:
        from PIL import Image
        import io

        image = Image.open(io.BytesIO(image_bytes))
        img = np.array(image)
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

        hands, img = detector.findHands(img)

        if hands:
            hand = hands[0]
            x, y, w, h = hand['bbox']

            # Crop and resize the hand region
            img_crop = img[y:y+h, x:x+w]
            img_crop_resized = cv2.resize(img_crop, (200, 200))

            # Process landmarks
            lm_list = hand["lmList"]
            if len(lm_list) == 21:
                keypoints = np.array(lm_list)[:, :3].flatten()
                keypoints = np.expand_dims(keypoints, axis=0)

                prediction = classifier.model.predict(keypoints)
                index = np.argmax(prediction)
                predicted_letter = LABELS_FULL[index]
                return predicted_letter
        return "nothing"
    except Exception as e:
        print(f"Error processing image: {e}")
        return "error"