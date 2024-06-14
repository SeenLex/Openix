import firebase_admin
from firebase_admin import credentials, firestore
from firebase_admin import db

cred = credentials.Certificate("firebase-adminsdk.json")

app = firebase_admin.initialize_app(cred)

def get_data():
    firebase_db = firestore.client()

    license_plates_docs = firebase_db.collection('license_plates').stream()
    license_plates = []
    for doc in license_plates_docs:
        license_plates.append(doc.to_dict().get('number'))

    return license_plates
