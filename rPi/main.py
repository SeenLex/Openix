import RPi.GPIO as GPIO
import time
from detection import detect_text
from db import get_data
from logic import check_license_plate_exists, show_check_status
import subprocess
from realtime_firebase import send_to_firebase, read_from_firebase
from datetime import datetime

####################
# SETUP
####################
GPIO.setmode(GPIO.BOARD)
open_flag = False
# Servo setup - not working properly
servo_pin = 16
GPIO.setup(servo_pin, GPIO.OUT)

servo = GPIO.PWM(servo_pin, 50)
servo.start(2.5)  # Initialization
time.sleep(1)

# ULTRASOUND SETUP
PIN_TRIGGER = 7
PIN_ECHO = 11
GPIO.setup(PIN_TRIGGER, GPIO.OUT)
GPIO.setup(PIN_ECHO, GPIO.IN)
GPIO.output(PIN_TRIGGER, GPIO.LOW)
time.sleep(2)

# Authorized plates
MY_PLATES = ["P265 BYV", ]

# Defining delays for time.sleep()
DELAY = 5


def calculate_distance():
    GPIO.output(PIN_TRIGGER, GPIO.HIGH)

    time.sleep(0.00001)

    GPIO.output(PIN_TRIGGER, GPIO.LOW)

    while GPIO.input(PIN_ECHO) == 0:
        pulse_start_time = time.time()
        print("time_0")
    while GPIO.input(PIN_ECHO) == 1:
        pulse_end_time = time.time()

    pulse_duration = pulse_end_time - pulse_start_time
    distance = round(pulse_duration * 17150, 2)
    print(distance)
    return distance


# takes pictures using webcam
def scan_for_plates():
    # Define the command
    print("SCANNING FOR PLATES --- TAKING PICTURE")
    command = ["fswebcam", "-r", "1280x720", "--no-banner", "plate.jpg"]

    # Execute the command
    result = subprocess.run(command, capture_output=True, text=True)

    # Print the output and any errors
    print("Output:", result.stdout)
    print("Error:", result.stderr)

    return True


def check_plate():
    """
    Checking to see if the plate number from "plate.jpg" matches one of the plates from the owner's cars
    :return: True if match detected
    """
    print("******CHECKING PLATE******")
    detected_text = detect_text("plate.jpg").replace(" ", "")
    print(detected_text)

    license_plates = get_data()
    print(license_plates)

    license_plate_exists = check_license_plate_exists(license_plates, detected_text)
    show_check_status(license_plate_exists)
    return license_plate_exists


def distance_within_params(x, y):
    if x > y:
        print("Left end of the interval greater than right end")
        return False

    distance = calculate_distance()
    if x < distance < y:
        distance1 = calculate_distance()
        if x < distance1 < y:
            distance2 = calculate_distance()
            if x < distance2 < y:
                return True
    return False


def gate_open():
    data = {
        'action': 'open',
        'timestamp': datetime.now().isoformat()
    }
    send_to_firebase(data, 'gate')

    print("Opening door")
    servo.ChangeDutyCycle(7.5)
    time.sleep(1)


def gate_close():
    data = {
        'action': 'close',
        'timestamp': datetime.now().isoformat()
    }
    send_to_firebase(data, 'gate')

    print("Closing door")
    servo.ChangeDutyCycle(2.5)
    time.sleep(1)


def gate_logic():
    global open_flag
    if not open_flag:
        gate_open()
        open_flag = True
        # keeping gate open for DELAY seconds
        time.sleep(DELAY)

    # not scanning anything until the open-close logic of the garage door is over
    while True:
        if distance_within_params(5, 30):
            # if door is already opened - car is in transit
            if open_flag:
                print("Vehicle detected, keeping door open...")

                # waiting for the car to enter
                time.sleep(DELAY)

            # if car is inside the garage
            if not open_flag:
                gate_open()
                open_flag = True
                time.sleep(DELAY)
        else:
            if open_flag:
                print("Vehicle NOT detected anymore")
                time.sleep(DELAY)
                gate_close()
                open_flag = False

            # ending the infinite loop
            break


try:
    while True:
        open_flag = False
        if read_from_firebase("gate_button"):
            gate_logic()
        elif distance_within_params(5, 30):
            print("Vehicle exiting")
            gate_logic()
        elif scan_for_plates():
            if check_plate():
                print("Vehicle detected")
                gate_logic()
            else:
                print("No vehicle detected.")
        
        time.sleep(0.5)

except KeyboardInterrupt:
    servo.stop()
    GPIO.cleanup()
