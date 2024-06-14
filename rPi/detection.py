import os
import io
from google.cloud import vision_v1
import pandas as pd

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r"cloudtoken.json"


def detect_text(image_path):
    """Detects text in an image using Google Cloud Vision API."""
    client = vision_v1.ImageAnnotatorClient()

    with io.open(image_path, 'rb') as image_file:
        content = image_file.read()

    image = vision_v1.Image(content=content)

    response = client.text_detection(image=image)

    if response.error.message:
        raise Exception(f'Error during text detection: {response.error.message}')

    df = pd.DataFrame(columns=['locale', 'description'])
    texts = response.text_annotations
    data = [{'locale': text.locale, 'description': text.description} for text in texts]
    if data:
        df = pd.concat([df, pd.DataFrame(data)], ignore_index=True)

    return df['description'][0] if not df.empty else ""
