import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential #type: ignore
from tensorflow.keras.layers import Dense #type: ignore
from tensorflow.keras.callbacks import EarlyStopping #type: ignore
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt


# Load existing extracted landmarks and labels
model_path_full = "./backend/model/model_data/"
X_data = np.load(f'{model_path_full}X_data.npy')
y_labels = np.load(f'{model_path_full}y_labels.npy')

# Function to flip X-coordinates to simulate left-hand data
def flip_hand_keypoints(data):
    flipped_data = data.copy()
    for i in range(0, data.shape[1], 3):  # Iterate over x-coordinates (every 3rd value)
        flipped_data[:, i] = 1.0 - flipped_data[:, i]  # Flip x
    return flipped_data

# Augment dataset by flipping right-hand keypoints to create left-hand data
X_data_flipped = flip_hand_keypoints(X_data)

# Combine original right-hand and flipped left-hand data
X_augmented = np.vstack((X_data, X_data_flipped))
y_augmented = np.hstack((y_labels, y_labels))  # Duplicate labels for new data

# Define labels
LABELS_FULL = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
    "del", "nothing", "space"
]

# Split the dataset into training and validation sets
X_train, X_test, y_train, y_test = train_test_split(X_augmented, y_augmented, test_size=0.25, random_state=42)

# Define the neural network model
model = Sequential([
    Dense(128, activation="relu", input_shape=(X_augmented.shape[1],)),
    Dense(64, activation="relu"),
    Dense(len(LABELS_FULL), activation="softmax")  # Output layer with 29 classes
])

# Compile the model
optimizer = tf.keras.optimizers.Adam(learning_rate=0.0001)
model.compile(optimizer=optimizer, loss="sparse_categorical_crossentropy", metrics=["accuracy"])

# Early Stopping to prevent overfitting
early_stop = EarlyStopping(monitor="val_loss", patience=15, restore_best_weights=True)

# Train the model
history = model.fit(X_train, y_train, epochs=250, validation_data=(X_test, y_test), callbacks=[early_stop])

# Save the trained model
model.save("asl_model_augmented_1.keras")

# Plot training & validation loss/accuracy
plt.figure(figsize=(12, 5))

# Loss plot
plt.subplot(1, 2, 1)
plt.plot(history.history["loss"], label="Training Loss")
plt.plot(history.history["val_loss"], label="Validation Loss")
plt.xlabel("Epochs")
plt.ylabel("Loss")
plt.title("Loss over Epochs")
plt.legend()

# Accuracy plot
plt.subplot(1, 2, 2)
plt.plot(history.history["accuracy"], label="Training Accuracy")
plt.plot(history.history["val_accuracy"], label="Validation Accuracy")
plt.xlabel("Epochs")
plt.ylabel("Accuracy")
plt.title("Accuracy over Epochs")
plt.legend()

# Show the plots
plt.show()
