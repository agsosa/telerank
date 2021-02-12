from telethon import TelegramClient, events, sync, functions, types
from google.cloud import storage
from firebase import firebase
import os

api_id = 2231021
api_hash = '63b5a11ccd236e46ee28222132920ccf'

client = TelegramClient('session_name', api_id, api_hash)
client.start()

result = client(functions.channels.GetFullChannelRequest(
    channel='ofertify'
))

# Get description, members count, title
print(result.full_chat.about)
print(result.full_chat.participants_count)
print(result.chats[0].title)

# Download photo and upload to Firebase Storage
client.download_profile_photo('ofertify')

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]= "../serviceAccountKey.json"
firebase = firebase.FirebaseApplication('https://telerank-e9b37-default-rtdb.firebaseio.com/')
client = storage.Client()
bucket = client.get_bucket('telerank-e9b37.appspot.com')
imageBlob = bucket.blob("/")
imagePath = "./ofertify.jpg"
imageBlob = bucket.blob("ofertify.jpg")
imageBlob.upload_from_filename(imagePath)
os.remove("./ofertify.jpg")

print(imageBlob.public_url)