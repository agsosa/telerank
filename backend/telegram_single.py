from telethon import TelegramClient, events, sync, functions, types
from google.cloud import storage
from firebase import firebase
import os, sys, json, asyncio
from PIL import Image

# TODO CHECK FOR ERRORS AND USERNAME NOT VALID

try:
    api_id = 2231021
    api_hash = '63b5a11ccd236e46ee28222132920ccf'
    client = TelegramClient('tg', api_id, api_hash)
    client.start()
    firebase = firebase.FirebaseApplication('https://telerank-e9b37-default-rtdb.firebaseio.com/')
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"]= "./serviceAccountKey.json"
    storage_client = storage.Client()
    bucket = storage_client.get_bucket('telerank-e9b37.appspot.com')

    x = sys.argv[1]

    result = client(functions.channels.GetFullChannelRequest(
        channel=x
    ))

    # Download photo and upload to Firebase Storage
    client.download_profile_photo(x)

    imageBlob = bucket.blob("/")
    imagePath = "./"+x+".jpg"

    # ptimize photo
    img = Image.open(imagePath)
    new_width  = 640
    new_height = 640
    img = img.resize((new_width, new_height), Image.ANTIALIAS)
    img.save(imagePath, optimize = True,  quality = 10)

    # upload photo
    imageBlob = bucket.blob(x+".jpg")
    imageBlob.upload_from_filename(imagePath)
    os.remove("./"+x+".jpg")

    print(json.dumps({"image": imageBlob.public_url, "title": result.chats[0].title, "description": result.full_chat.about, "members": result.full_chat.participants_count}))
except Exception as e:
    print("ERROR "+str(e))
sys.stdout.flush()