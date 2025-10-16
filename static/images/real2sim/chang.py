import cv2
import numpy as np

# Load the image
image = cv2.imread('thumb18.jpg')

# Resize the image to 640x360 (if it's not already)
resized_image = cv2.resize(image, (640, 360))

# Create a blank canvas of 640x480 with a white background
output_image = np.ones((480, 640, 3), dtype=np.uint8) * 255  # White background

# Center the resized image on the canvas
y_offset = (output_image.shape[0] - resized_image.shape[0]) // 2
x_offset = (output_image.shape[1] - resized_image.shape[1]) // 2
output_image[y_offset:y_offset+resized_image.shape[0], x_offset:x_offset+resized_image.shape[1]] = resized_image

# Save the output
cv2.imwrite('thumb18.jpg', output_image)
