def check_license_plate_exists(license_plates, detected_text):
    return detected_text in license_plates


def show_check_status(license_plate_exists):
    if license_plate_exists:
        print("License plate exists in the database.")
    else:
        print("License plate does not exist in the database.")
