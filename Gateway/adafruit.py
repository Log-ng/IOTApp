import random
import time
import sys
from Adafruit_IO import MQTTClient

import serial.tools.list_ports
mess = ""
bbc_port = "COM6"
if len(bbc_port) > 0:
    ser = serial.Serial(port=bbc_port, baudrate=115200)

def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    return splitData

def readSerial():
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            data = processData(mess[start:end + 1])

            if data[1] == 'TEMP':
                client.publish("demo.temp", int(data[2]))
            elif data[1] == 'HUMID':
                client.publish("demo.humid", int(data[2]))

            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]

AIO_FEED_ID = ['demo.led', 'demo.pump']
AIO_USERNAME = "an_ngdinh"
AIO_KEY = "aio_XEHl42fHnGvADmMAVSsPGxYh5evT"

def connected(client):
    print("Ket noi thanh cong ...")
    for feed in AIO_FEED_ID:
        client.subscribe(feed)

def subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong ...")

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit (1)

def message(client , feed_id , payload):
    print("Nhan du lieu: ", client, feed_id, payload)
    if feed_id == 'demo.led':
        message = "!1:LED:" + payload
        ser.write((str(message) + "#").encode()) 
    elif feed_id == 'demo.pump':
        message = "!1:PUMP:" + payload
        ser.write((str(message) + "#").encode()) 

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()


while True:
    # temp = random.randint(0, 50)
    humid = random.randint(50, 100)
    print('humid:', humid)
    # client.publish("demo.temp", temp)
    client.publish("demo.humid", humid)
    # time.sleep(3)

    if len(bbc_port) > 0:
        # print('Start read serial...')
        readSerial()
    time.sleep(3)