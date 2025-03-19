from PIL import Image
import os

# Defining the path to the main file containing the data
main_folder = "E:/DataSets/dataset 3 ASL/asl_alphabet_train/asl_alphabet_train"

# Looping through each subfolder in the dataset (A, B, C, etc.)
for letter_folder in os.listdir(main_folder):
    letter_folder_path = os.path.join(main_folder, letter_folder)
    
    # Checks if the directory exists to skip files that aren't folders
    # Proceeds to loop through all of the files in each directory in order to open each image and flip it horizontally
    if os.path.isdir(letter_folder_path):
        for idx, filename in enumerate(os.listdir(letter_folder_path)):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                img_path = os.path.join(letter_folder_path, filename)
                with Image.open(img_path) as img:
                    flipped_img = img.transpose(Image.FLIP_LEFT_RIGHT)
                    new_filename = f"M_{letter_folder}{idx + 1}{os.path.splitext(filename)[1]}"
                    output_path = os.path.join(letter_folder_path, new_filename)
                    flipped_img.save(output_path)

print("All images have been flipped and saved.")