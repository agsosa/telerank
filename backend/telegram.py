from telethon import TelegramClient, events, sync, functions, types
from google.cloud import storage
from firebase import firebase
import os, sys, json
from PIL import Image

# TODO COMPRESS-RESIZE IMAGE

api_id = 2231021
api_hash = '63b5a11ccd236e46ee28222132920ccf'
client = TelegramClient('tg', api_id, api_hash)
client.start()
firebase = firebase.FirebaseApplication('https://telerank-e9b37-default-rtdb.firebaseio.com/')
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]= "./serviceAccountKey.json"
storage_client = storage.Client()
bucket = storage_client.get_bucket('telerank-e9b37.appspot.com')

arg = sys.argv[1]
usernames = arg.split(",")

final = []

for x in usernames:
    result = client(functions.channels.GetFullChannelRequest(
        channel=x
    ))

    # Get description, members count, title
    #print(result.full_chat.about)
    #print(result.full_chat.participants_count)
    #print(result.chats[0].title)

    # Download photo and upload to Firebase Storage
    client.download_profile_photo(x)

    imageBlob = bucket.blob("/")
    imagePath = "./"+x+".jpg"

    img = Image.open(imagePath)
    new_width  = 640
    new_height = 640
    img = img.resize((new_width, new_height), Image.ANTIALIAS)
    img.save(imagePath, optimize = True,  quality = 10)
    
    imageBlob = bucket.blob(x+".jpg")
    imageBlob.upload_from_filename(imagePath)
    os.remove("./"+x+".jpg")

    #print(imageBlob.public_url)
    
    final.append({"image": imageBlob.public_url, "title": result.chats[0].title, "description": result.full_chat.about, "members": result.full_chat.participants_count})

print(json.dumps(final))
sys.stdout.flush()