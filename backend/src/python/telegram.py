from telethon import TelegramClient, events, sync, functions, types
from google.cloud import storage
from firebase import firebase
import os, sys, json, asyncio
from PIL import Image

# ** UNUSED, REPLACED BY /scrapers/telegram-proto and /lib/GCloud

# Get Telegram info (image, title, description, members) by username. The image will be uploaded to a google cloud storage bucket.
# Returns { image: public url returned by google cloud storage, title: string, description: string, members: number}

# TODO CHECK FOR ERRORS AND USERNAME NOT VALID

try:
    # Initialize Telegram client
    api_id = 2231021
    api_hash = '63b5a11ccd236e46ee28222132920ccf'
    client = TelegramClient('tg', api_id, api_hash)
    client.start()

    # Initialize Google Cloud Storage
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"]= "./serviceAccountKey.json"
    storage_client = storage.Client()
    bucket = storage_client.get_bucket('telerank-e9b37.appspot.com')

    # Get username from arguments
    username = sys.argv[1]

    # Get information from Telegram
    result = client(functions.channels.GetFullChannelRequest(
        channel = username
    ))

    # Download photo
    client.download_profile_photo(username)
    imagePath = "./"+username+".jpg"

    # Optimize photo
    img = Image.open(imagePath)
    new_width  = 425
    new_height = 425
    resized = img.resize((new_width, new_height), Image.ANTIALIAS)
    resized.save(imagePath, optimize = True,  quality = 10)

    # Upload photo to google storage
    imageBlob = bucket.blob(username+".jpg")
    imageBlob.upload_from_filename(imagePath)
    os.remove(imagePath)

    # Send result
    print(json.dumps({"image": imageBlob.public_url, "title": result.chats[0].title, "description": result.full_chat.about, "members": result.full_chat.participants_count}))
    
except Exception as e:
    print("ERROR "+str(e))

sys.stdout.flush()