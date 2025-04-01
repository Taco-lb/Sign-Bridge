import os
import numpy as np
import cv2
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier
from sklearn.metrics import classification_report, confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

LABELS_FULL = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "space", "del", "nothing"
]

detector = HandDetector(maxHands=1)
classifier = Classifier("./backend/model/asl_model_augmented_1.keras") 

test_folder = "E:/DataSets/dataset 2 ASL/asl_alphabet_train/TEST 2"
offset = 25
img_size = 200

true_labels = []
predicted_labels = []
failed_images = []

def get_true_label(filename):
    return filename.split('_')[0].upper()

# Process test images from the directory
for filename in os.listdir(test_folder):
    if not filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
        continue
    
    try:
        true_label = get_true_label(filename)
        if true_label not in LABELS_FULL:
            continue
            
        img_path = os.path.join(test_folder, filename)
        img = cv2.imread(img_path)
        
        if img is None:
            failed_images.append(filename)
            continue
        
        hands, _ = detector.findHands(img)
        
        if hands:
            hand = hands[0]
            x, y, w, h = hand['bbox']
            
            y1 = max(0, y - offset)
            y2 = min(img.shape[0], y + h + offset)
            x1 = max(0, x - offset)
            x2 = min(img.shape[1], x + w + offset)
            img_crop = img[y1:y2, x1:x2]
            
            # Process landmarks
            lm_list = hand["lmList"]
            if len(lm_list) == 21:
                keypoints = np.array(lm_list)[:, :3].flatten()
                prediction = classifier.model.predict(np.expand_dims(keypoints, axis=0), verbose=0)[0]
                predicted_index = np.argmax(prediction)
                
                true_labels.append(LABELS_FULL.index(true_label))
                predicted_labels.append(predicted_index)
        else:
            failed_images.append(filename)
    except Exception as e:
        print(f"Error processing {filename}: {str(e)}")
        failed_images.append(filename)


# Performance Metrics
if len(true_labels) == 0:
    raise ValueError("No valid test cases processed - check your test folder and hand detection")

# Find ACTUAL classes present in predictions
used_classes = np.unique(np.concatenate([true_labels, predicted_labels]))
print(f"\nModel is working with {len(used_classes)} classes:")
print([LABELS_FULL[i] for i in used_classes])

# Generate classification report with proper alignment
print("\n=== Classification Report ===")
print(classification_report(
    true_labels,
    predicted_labels,
    labels=used_classes,
    target_names=[LABELS_FULL[i] for i in used_classes],
    zero_division=0
))

# Confusion Matrix
plt.figure(figsize=(12, 12))
cm = confusion_matrix(true_labels, predicted_labels, labels=used_classes)
disp = ConfusionMatrixDisplay(
    confusion_matrix=cm,
    display_labels=[LABELS_FULL[i] for i in used_classes]
)
disp.plot(cmap='Blues', values_format='d', xticks_rotation=45)
plt.title("ASL Classification Confusion Matrix")
plt.tight_layout()
plt.savefig('asl_confusion_matrix.png', dpi=300, bbox_inches='tight')
print("\nConfusion matrix saved to 'asl_confusion_matrix.png'")

# Error Analysis
print(f"\nFailed to process {len(failed_images)} images:")
if len(failed_images) > 0:
    print("Sample failures:", failed_images[:10])