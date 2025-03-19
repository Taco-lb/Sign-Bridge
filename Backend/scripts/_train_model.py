import tensorflow as tf
from tensorflow.keras.models import Sequential #type: ignore 
from tensorflow.keras.layers import Dense  #type: ignore
from tensorflow.keras.callbacks import EarlyStopping  #type: ignore
from sklearn.model_selection import train_test_split
import numpy as np
import matplotlib.pyplot as plt

# Define labels
LABELS_FULL = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
    "del", "nothing", "space"
]

# Load the extracted keypoints (change)
model_path_full = "./backend/model/model_data/"
X = np.load(f"{model_path_full}X_data.npy")
Y = np.load(f"{model_path_full}y_labels.npy")

# Split data into training and validation sets
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

# Define the model that is going to be trained
model = Sequential([
    Dense(128, activation="relu", input_shape=(X.shape[1],)),
    Dense(64, activation="relu"),
    Dense(len(LABELS_FULL), activation="softmax")
])

# Compile the model using Adam for better efficiency optimization 
optimizer = tf.keras.optimizers.Adam(learning_rate=0.0001)
model.compile(optimizer=optimizer, loss="sparse_categorical_crossentropy", metrics=["accuracy"])

# Early Stopping function in order to prevent overfitting of the model 
early_stop = EarlyStopping( monitor="val_loss", patience=15, restore_best_weights=True )

# Model training... since overfitting is included the epochs will stop when no more improvement is being found while training
history = model.fit(X_train, y_train, epochs=250, validation_data=(X_test, y_test), callbacks=[early_stop])

# Save the trained model (change)
model.save("asl_model_5.keras")

# Plot training & validation loss values
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
