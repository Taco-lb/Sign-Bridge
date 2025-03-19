import cv2
from cvzone.HandTrackingModule import HandDetector
import numpy as np
import os

# Initialize webcam
capture = cv2.VideoCapture(0)
detector = HandDetector(maxHands=1)

offset = 30
img_size = 200
counter = 0

letter = "H"
folder = f"./backend/my_asl_data/{letter}"

while True:
    success, img = capture.read()
    
    if not success:
        print("Failed to capture image")
        break

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

        #cv2.imshow("Image Crop", img_crop)
        cv2.imshow("Image Crop White", img_white)

    cv2.imshow("Image", img)
    key = cv2.waitKey(1)
    
    if key == ord("s"):
        if not os.path.exists(folder):
            os.makedirs(folder)
            
        counter += 1
        # cv2.imwrite(f'{folder}/Image_{letter}_{time.time()}.jpeg', img_white)
        cv2.imwrite(f'{folder}/{letter}{3000 + counter}.jpeg', img_white)
        print("counter", counter)
    
    
    if key == ord("q") or counter == 1000:
        print("Exiting...")
        break
    
capture.release()
cv2.destroyAllWindows()