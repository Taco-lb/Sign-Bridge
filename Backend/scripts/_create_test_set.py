import os
import random
import shutil
from pathlib import Path

def select_test_images(main_folder_path, output_folder='TEST 2', samples_per_class=50):
    classes = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "space", "del" 
    ]
    
    # Create output folder if it doesn't exist
    output_path = Path(main_folder_path).parent / output_folder
    output_path.mkdir(exist_ok=True)
    
    # Process each class folder
    for class_name in classes:
        class_path = Path(main_folder_path) / class_name
        
        if not class_path.exists():
            print(f"Warning: Folder '{class_name}' not found in main directory")
            continue
            
        image_files = [f for f in class_path.iterdir() if f.is_file()]
        
        if len(image_files) < samples_per_class:
            print(f"Warning: Not enough images in '{class_name}' folder (has {len(image_files)}, needs {samples_per_class})")
            continue
            
        selected_images = random.sample(image_files, samples_per_class)
        
        for i, image_path in enumerate(selected_images, start=1):
            new_name = f"{class_name}_{i}{image_path.suffix}"
            shutil.copy2(image_path, output_path / new_name)
    
    print(f"Successfully copied {samples_per_class} images from each class to '{output_path}'")

if __name__ == "__main__":
    main_folder = r"E:/DataSets/dataset 2 ASL/asl_alphabet_train/asl_alphabet_train"
    
    if not os.path.exists(main_folder):
        print(f"Error: The specified path does not exist: {main_folder}")
    else:
        select_test_images(main_folder)