from random import random
import requests
import datetime
import json

# x = datetime.datetime.now()
# url = 'https://iot-do-an-api.herokuapp.com/noti'
# myobj = {'content': random(),'date':x}

# x = requests.post(url, data = myobj)

# print(x.text)

headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
url="https://io.adafruit.com/api/v2/hoangkui/feeds/temp/data";
data={
    
    "X-AIO-Key":"aio_KGCu65hbtZoT3IVlQ1v3DOn437ue",
    "datum": {"value": "0"}};
x=requests.post(url,data=json.dumps(data),headers=headers)
print(x.text)


