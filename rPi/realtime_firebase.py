import time
import pyrebase
from datetime import datetime

firebaseConfig = {
    "apiKey": "AIzaSyANYMcd3tnp7hRHkH8NmNSa48TDTeHIX2c",
    "authDomain": "openix-e6f73.firebaseapp.com",
    "databaseURL": "https://openix-e6f73-default-rtdb.europe-west1.firebasedatabase.app/",
    "storageBucket": "openix-e6f73.appspot.com",
}

firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()


def send_to_firebase(data, node_path):
    db.child(node_path).push(data)
    db.update(data)
    print(f"Sent to node {node_path}, the data: {data}")


def read_from_firebase(node_path):
    ref = db.child(node_path)
    response = ref.get()
    if response is not None:
        return response.val()
    else:
        return None


if __name__ == "__main__":
    for i in range(3):
        data_test = {
            'timestamp': datetime.now().isoformat(),
            'action': f'NESTED_TEST_{i}',
        }
        send_to_firebase(data_test, 'gate')
        time.sleep(4)
