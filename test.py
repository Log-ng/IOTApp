import requests
import datetime

x = datetime.datetime.now()
url = 'https://iot-do-an-api.herokuapp.com/noti'
myobj = {'content': 'somevalue','date':x}

x = requests.post(url, data = myobj)

print(x.text)